#!/usr/bin/env python3
"""
Generate Memory Grain logo assets for web and mobile.

Extracts from the 3rd variant design (4-square icon + highlighted M/G wordmark).

Outputs to ~/mg/memorygrain/public/:
  favicon.svg              SVG icon mark (for modern browsers)
  favicon.ico              Multi-size ICO (16/32/48)
  logo-icon-192.png        192×192 transparent icon (PWA manifest)
  logo-icon-512.png        512×512 transparent icon (PWA manifest)
  apple-touch-icon.png     180×180 icon (iOS home screen)
  logo-header.svg          Horizontal lockup for light backgrounds
  logo-header-dark.svg     Horizontal lockup for dark backgrounds
  logo-tagline.svg         Lockup with tagline for light backgrounds
  logo-tagline-dark.svg    Lockup with tagline for dark backgrounds

Usage:
  python3 scripts/generate-logos.py
"""

import os
import sys

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Pillow not found. Installing...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image, ImageDraw

# ── Output directory ──
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public")
OUTPUT_DIR = os.path.normpath(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── Brand colors (RGBA) ──
GRAIN_TL = (153, 246, 228, 255)  # #99F6E4
GRAIN_TR = (94, 234, 212, 255)   # #5EEAD4
GRAIN_BL = (45, 212, 191, 255)   # #2DD4BF
GRAIN_BR = (13, 148, 136, 255)   # #0D9488
GRAINS = [GRAIN_TL, GRAIN_TR, GRAIN_BL, GRAIN_BR]


def draw_icon(size, padding_pct=0.1):
    """Draw 4 rounded squares in a 2×2 grid on transparent background."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = round(size * padding_pct)
    avail = size - 2 * pad
    gap = max(1, round(avail * 0.09))
    sq = (avail - gap) // 2
    r = max(1, round(sq * 0.23))

    offsets = [(0, 0), (sq + gap, 0), (0, sq + gap), (sq + gap, sq + gap)]
    for (dx, dy), color in zip(offsets, GRAINS):
        x0, y0 = pad + dx, pad + dy
        draw.rounded_rectangle((x0, y0, x0 + sq, y0 + sq), radius=r, fill=color)

    return img


def favicon_svg():
    """SVG icon mark — 4 rounded squares."""
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
  <rect x="0" y="0" width="20" height="20" rx="5" fill="#99F6E4"/>
  <rect x="24" y="0" width="20" height="20" rx="5" fill="#5EEAD4"/>
  <rect x="0" y="24" width="20" height="20" rx="5" fill="#2DD4BF"/>
  <rect x="24" y="24" width="20" height="20" rx="5" fill="#0D9488"/>
</svg>"""


def header_svg(dark=False):
    """Horizontal lockup SVG: icon + 'Memory Grain' with highlighted M/G."""
    if dark:
        text_fill = "#FFFFFF"
        accent_fill = "#5EEAD4"
    else:
        text_fill = "#0F172A"
        accent_fill = "#0D9488"

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 44" fill="none">
  <!-- Icon: 4 grain squares -->
  <rect x="0" y="0" width="20" height="20" rx="5" fill="#99F6E4"/>
  <rect x="24" y="0" width="20" height="20" rx="5" fill="#5EEAD4"/>
  <rect x="0" y="24" width="20" height="20" rx="5" fill="#2DD4BF"/>
  <rect x="24" y="24" width="20" height="20" rx="5" fill="#0D9488"/>
  <!-- Wordmark: Memory Grain with M/G highlighted -->
  <text y="32" font-family="'Space Grotesk', system-ui, -apple-system, sans-serif" font-size="32" letter-spacing="-0.5">
    <tspan x="58" font-weight="700" fill="{accent_fill}">M</tspan><tspan font-weight="600" fill="{text_fill}">emory</tspan>
    <tspan dx="6" font-weight="700" fill="{accent_fill}">G</tspan><tspan font-weight="600" fill="{text_fill}">rain</tspan>
  </text>
</svg>"""


def tagline_svg(dark=False):
    """Horizontal lockup SVG with tagline subtitle."""
    if dark:
        text_fill = "#FFFFFF"
        accent_fill = "#5EEAD4"
        sub_fill = "#94A3B8"
    else:
        text_fill = "#0F172A"
        accent_fill = "#0D9488"
        sub_fill = "#64748B"

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 48" fill="none">
  <!-- Icon: 4 grain squares -->
  <rect x="0" y="2" width="20" height="20" rx="5" fill="#99F6E4"/>
  <rect x="24" y="2" width="20" height="20" rx="5" fill="#5EEAD4"/>
  <rect x="0" y="26" width="20" height="20" rx="5" fill="#2DD4BF"/>
  <rect x="24" y="26" width="20" height="20" rx="5" fill="#0D9488"/>
  <!-- Wordmark: Memory Grain with M/G highlighted -->
  <text y="28" font-family="'Space Grotesk', system-ui, -apple-system, sans-serif" font-size="32" letter-spacing="-0.5">
    <tspan x="58" font-weight="700" fill="{accent_fill}">M</tspan><tspan font-weight="600" fill="{text_fill}">emory</tspan>
    <tspan dx="6" font-weight="700" fill="{accent_fill}">G</tspan><tspan font-weight="600" fill="{text_fill}">rain</tspan>
  </text>
  <!-- Tagline -->
  <text x="58" y="46" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="16" letter-spacing="0.5" fill="{sub_fill}">.mg — open memory format</text>
</svg>"""


def main():
    print("Generating Memory Grain logo assets...\n")

    # ── PNG icons (transparent background) ──
    icon_specs = [
        ("logo-icon-512.png", 512, 0.10),
        ("logo-icon-192.png", 192, 0.10),
        ("apple-touch-icon.png", 180, 0.10),
    ]
    for name, size, pad in icon_specs:
        path = os.path.join(OUTPUT_DIR, name)
        draw_icon(size, padding_pct=pad).save(path)
        print(f"  {name:30s} {size}x{size}")

    # ── Favicon ICO (multi-size) ──
    ico_sizes = [16, 32, 48]
    ico_path = os.path.join(OUTPUT_DIR, "favicon.ico")
    largest = draw_icon(256, padding_pct=0.05)
    largest.save(
        ico_path,
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
    )
    print(f"  {'favicon.ico':30s} {'/'.join(str(s) for s in ico_sizes)}")

    # ── SVG assets ──
    svg_files = [
        ("favicon.svg", favicon_svg()),
        ("logo-header.svg", header_svg(dark=False)),
        ("logo-header-dark.svg", header_svg(dark=True)),
        ("logo-tagline.svg", tagline_svg(dark=False)),
        ("logo-tagline-dark.svg", tagline_svg(dark=True)),
    ]
    for name, content in svg_files:
        path = os.path.join(OUTPUT_DIR, name)
        with open(path, "w") as f:
            f.write(content)
        print(f"  {name:30s} SVG")

    print(f"\nAll files saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
