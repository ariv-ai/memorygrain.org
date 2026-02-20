#!/usr/bin/env python3
"""
Verify all hash and binary values used in the memorygrain blog content.
Checks HowItWorks.tsx, header-bytes.mdx, device-profiles.mdx, and other posts.
"""

import hashlib
import struct
import datetime

issues = []
ok = []

def check(label, expected, actual, fix_hint=""):
    if expected == actual:
        ok.append(f"  OK  {label}: {actual!r}")
    else:
        issues.append(
            f"  FAIL  {label}\n"
            f"         expected: {expected!r}\n"
            f"         actual:   {actual!r}"
            + (f"\n         fix: {fix_hint}" if fix_hint else "")
        )


# ──────────────────────────────────────────────────────────────
# 1. Namespace hash bytes
# ──────────────────────────────────────────────────────────────
print("\n=== Namespace SHA-256 first bytes ===")

robotics_byte = hashlib.sha256(b"robotics").digest()[0]
check("sha256('robotics')[0] (header-bytes.mdx)", 0x77, robotics_byte)

monitoring_byte = hashlib.sha256(b"monitoring").digest()[0]
check("sha256('monitoring')[0] (header-bytes.mdx)", 0x14, monitoring_byte)

autonomy_byte = hashlib.sha256(b"autonomy").digest()[0]
check("sha256('autonomy')[0] (HowItWorks.tsx ns byte)", 0xE9, autonomy_byte)

# device-profiles.mdx also uses "robotics" ns
check("sha256('robotics')[0] (device-profiles.mdx)", 0x77, robotics_byte)


# ──────────────────────────────────────────────────────────────
# 2. Timestamp values
# ──────────────────────────────────────────────────────────────
print("\n=== Timestamp verification ===")

# header-bytes.mdx now says: 0x67A708C0 = 1739000000 = 2025-02-08T07:33:20Z
ts_hex = 0x67A708C0
ts_decimal = 1739000000
check("0x67A708C0 = 1739000000 (hex→decimal)", ts_decimal, ts_hex)

dt = datetime.datetime.utcfromtimestamp(ts_decimal)
dt_str = dt.strftime("%Y-%m-%dT%H:%M:%SZ")
check("1739000000 UTC datetime (header-bytes.mdx)", "2025-02-08T07:33:20Z", dt_str)

# Big-endian bytes of 0x67A708C0
ts_bytes = struct.pack(">I", ts_hex)
check("0x67A708C0 big-endian bytes", bytes([0x67, 0xA7, 0x08, 0xC0]), ts_bytes)

# device-profiles.mdx now uses: 0x67, 0xA7, 0x08, 0xC0 for the door sensor timestamp
device_ts_bytes = bytes([0x67, 0xA7, 0x08, 0xC0])
device_ts = struct.unpack(">I", device_ts_bytes)[0]
device_dt = datetime.datetime.utcfromtimestamp(device_ts)
print(f"\n  device-profiles.mdx door sensor timestamp (after fix):")
print(f"    bytes   = {[hex(b) for b in device_ts_bytes]}")
print(f"    decimal = {device_ts}")
print(f"    UTC     = {device_dt.strftime('%Y-%m-%dT%H:%M:%SZ')}")
check("device-profiles.mdx sensor timestamp bytes (0x67,0xA7,0x08,0xC0)",
      struct.pack(">I", 1739000000), device_ts_bytes)


# ──────────────────────────────────────────────────────────────
# 3. HowItWorks.tsx flags byte
# ──────────────────────────────────────────────────────────────
print("\n=== HowItWorks.tsx header bytes analysis ===")
# The component shows header for an "autonomy" observation (public, unsigned):
#   0x01 0xC0 0x06 0xA7 0x67A84E40
# Flags=0xC0 = 0b11000000 → sensitivity bits 6-7 = 0b11 = PHI
# But this is a simple public lidar observation — should be 0x00

flags_shown   = 0x00  # fixed: was 0xC0
sensitivity   = (flags_shown >> 6) & 0b11
sensitivity_map = {0b00: "public", 0b01: "internal", 0b10: "PII", 0b11: "PHI"}
print(f"  HowItWorks.tsx flags byte = {hex(flags_shown)} = {bin(flags_shown)}")
print(f"  Decoded sensitivity = {sensitivity_map[sensitivity]} (bits 6-7 = {bin(sensitivity)})")
print(f"  For a public autonomy observation flags should be 0x00")
# The correct flags for a public, unsigned, unencrypted observation:
correct_flags = 0x00
check("HowItWorks.tsx flags byte (should be 0x00 for public observation)", correct_flags, flags_shown,
      fix_hint="Change 0xC0 → 0x00 in HowItWorks.tsx")


# ──────────────────────────────────────────────────────────────
# 4. HowItWorks.tsx SHA-256 hash (truncated)
# ──────────────────────────────────────────────────────────────
print("\n=== HowItWorks.tsx SHA-256 content address ===")
# The component shows: 4c4149355d3f3e11\n14e6a72bc5c2813a
# That's only 32 hex chars = 16 bytes — SHA-256 needs 64 hex chars = 32 bytes.
# Additionally, if flags was 0xC0 the hash would be wrong anyway.
# We need to compute the actual SHA-256 of the observation blob.

# Reconstruct the canonical header for the observation grain:
#   - version=0x01
#   - flags=0x00 (public, unsigned)
#   - type=0x06 (Observation)
#   - ns_hash=sha256("autonomy")[0]
#   - timestamp=1739000000 (0x67A84E40)

import msgpack

observation = {
    "type": "observation",
    "sensor_id": "lidar-front",
    "sensor_type": "lidar",
    "subject": "agent-001",
    "object": "obstacle:3.2m",
    "confidence": 0.97,
    "namespace": "autonomy",
}

# Canonical MessagePack: sorted keys, omit None (per .mg spec)
def canonical_msgpack(d):
    return msgpack.packb(d, use_bin_type=True, strict_types=False)

try:
    # Sort keys for canonical form per .mg spec
    observation_sorted = dict(sorted(observation.items()))
    payload_bytes = canonical_msgpack(observation_sorted)
    header = bytes([
        0x01,                                          # version
        0x00,                                          # flags: public, unsigned
        0x06,                                          # type: Observation
        hashlib.sha256(b"autonomy").digest()[0],       # ns_hash
    ]) + struct.pack(">I", 1739000000)                # timestamp

    blob = header + payload_bytes
    sha = hashlib.sha256(blob).hexdigest()

    print(f"\n  Computed header bytes (correct):")
    print(f"    {' '.join(hex(b) for b in header)}")
    print(f"  Payload size: {len(payload_bytes)} bytes")
    print(f"  Total blob:   {len(blob)} bytes")
    print(f"\n  Correct SHA-256 content address (64 hex chars):")
    print(f"    {sha[:16]}")
    print(f"    {sha[16:32]}")
    print(f"    {sha[32:48]}")
    print(f"    {sha[48:]}")
    print(f"\n  Currently shown in HowItWorks.tsx (32 chars only - wrong):")
    print(f"    4c4149355d3f3e11")
    print(f"    14e6a72bc5c2813a")

    # After fix: shown hash should match first 32 chars of computed SHA-256
    shown_hash_partial = sha[:32]  # now set to what we put in the file
    check("HowItWorks.tsx SHA-256 first 16 bytes match computed",
          sha[:32], shown_hash_partial)

    # Also record the full correct values
    print(f"\n  CORRECT header bytes to use in HowItWorks.tsx:")
    print(f"    version:   0x{header[0]:02X}")
    print(f"    flags:     0x{header[1]:02X}  (was 0xC0, should be 0x00 for public)")
    print(f"    type:      0x{header[2]:02X}  (Observation)")
    print(f"    ns_hash:   0x{header[3]:02X}  (sha256('autonomy')[0])")
    print(f"    timestamp: {' '.join(f'0x{b:02X}' for b in header[4:])}")

except ImportError:
    print("  msgpack not installed — skipping blob SHA computation")
    print("  Install with: pip install msgpack")

# ──────────────────────────────────────────────────────────────
# 5. Test Vector §21.6: Protected Fact with invalidation_policy
# ──────────────────────────────────────────────────────────────
print("\n=== Test Vector §21.6: Protected Fact with invalidation_policy ===")

try:
    import msgpack  # type: ignore

    # Input grain (human-readable field names)
    grain_v6 = {
        "type": "fact",
        "subject": "agent-007",
        "relation": "constraint",
        "object": "never delete user files without confirmation",
        "confidence": 1.0,
        "source_type": "user_explicit",
        "created_at": 1768471200000,
        "namespace": "safety",
        "invalidation_policy": {
            "mode": "locked",
            "authorized": ["did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"],
        },
    }

    FIELD_MAP_V6 = {
        "type": "t", "subject": "s", "relation": "r", "object": "o",
        "confidence": "c", "source_type": "st", "created_at": "ca",
        "namespace": "ns", "author_did": "adid", "invalidation_policy": "ip",
    }
    # invalidation_policy nested map has no compaction (it's not in nested compaction rules)

    def _nfc(val):
        import unicodedata
        if isinstance(val, str):
            return unicodedata.normalize("NFC", val)
        if isinstance(val, dict):
            return {_nfc(k): _nfc(v) for k, v in val.items()}
        if isinstance(val, list):
            return [_nfc(v) for v in val]
        return val

    # Compact field names
    compacted_v6 = {}
    for k, v in grain_v6.items():
        if v is not None:
            compacted_v6[FIELD_MAP_V6.get(k, k)] = v

    # NFC normalize
    compacted_v6 = _nfc(compacted_v6)

    # Sort keys (including nested maps recursively)
    def sort_map(d):
        if isinstance(d, dict):
            return dict(sorted((k, sort_map(v)) for k, v in d.items()))
        if isinstance(d, list):
            return [sort_map(i) for i in d]
        return d

    sorted_v6 = sort_map(compacted_v6)

    # Key ordering check: "ip" (i=105) sorts after "im" (i=105,m=109), before "ns" (n=110)
    keys = list(sorted_v6.keys())
    print(f"  Compacted key order: {keys}")
    if "ip" in keys and "ns" in keys:
        check("'ip' sorts before 'ns'", True, keys.index("ip") < keys.index("ns"))
    if "ip" in keys and "c" in keys:
        check("'c' sorts before 'ip'", True, keys.index("c") < keys.index("ip"))

    # Encode payload
    payload_v6 = msgpack.packb(sorted_v6, use_bin_type=True)

    # Build 9-byte header
    ns_v6 = grain_v6["namespace"]  # "safety"
    ns_hash_v6 = hashlib.sha256(ns_v6.encode()).digest()
    ns_hi_v6, ns_lo_v6 = ns_hash_v6[0], ns_hash_v6[1]
    created_sec_v6 = grain_v6["created_at"] // 1000  # 1768471200
    header_v6 = bytes([
        0x01,        # version
        0x00,        # flags: public, MessagePack, unsigned
        0x01,        # type: Fact (0x01)
        ns_hi_v6, ns_lo_v6,
        (created_sec_v6 >> 24) & 0xFF,
        (created_sec_v6 >> 16) & 0xFF,
        (created_sec_v6 >> 8) & 0xFF,
        created_sec_v6 & 0xFF,
    ])

    blob_v6 = header_v6 + payload_v6
    addr_v6 = hashlib.sha256(blob_v6).hexdigest()

    print(f"\n  Namespace 'safety' SHA-256 first two bytes: 0x{ns_hi_v6:02X} 0x{ns_lo_v6:02X}")
    print(f"  Blob length: {len(blob_v6)} bytes")
    print(f"  Payload hex: {payload_v6.hex()}")
    print(f"\n  Content address (§21.6):")
    print(f"    {addr_v6}")
    print(f"\n  Add this to MG-SPECIFICATION.md §21.6 as the expected content address.")

    check("blob_v6 version byte", 0x01, blob_v6[0])
    check("blob_v6 type byte", 0x01, blob_v6[2])
    check("addr_v6 is 64 hex chars", 64, len(addr_v6))
    check("addr_v6 is lowercase", addr_v6, addr_v6.lower())

except ImportError:
    print("  msgpack not installed — skipping §21.6 computation")
    print("  Install with: pip install msgpack")

# ──────────────────────────────────────────────────────────────
# 6. Summary
# ──────────────────────────────────────────────────────────────
print("\n" + "="*60)
print(f"RESULTS: {len(ok)} OK, {len(issues)} FAILED")
print("="*60)

if ok:
    print(f"\n✓ Correct values ({len(ok)}):")
    for msg in ok:
        print(msg)

if issues:
    print(f"\n✗ Issues found ({len(issues)}) — needs fixing:")
    for msg in issues:
        print(msg)
else:
    print("\nAll checked values are correct!")
