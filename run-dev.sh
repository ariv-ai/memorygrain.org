#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

if ! command -v npm &>/dev/null; then
  echo "npm not found. Please install Node.js." >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

exec npm run dev
