#!/usr/bin/env bash
set -euo pipefail

# Ensure we're at repo root
cd "$(dirname "$0")/.."

echo "Cleaning GitHub Pages config to use Actions and root base..."

# 1) Ensure template.base is set to '/'
if grep -q "base: '/portfolio/'" src/settings.ts; then
  sed -i.bak "s|base: '/portfolio/'|base: '/'|" src/settings.ts
  rm -f src/settings.ts.bak
  echo "Updated src/settings.ts base to '/'"
fi

# 2) Remove duplicate gh-pages workflow if present
if [ -f .github/workflows/gh-pages.yml ]; then
  rm .github/workflows/gh-pages.yml
  echo "Removed .github/workflows/gh-pages.yml"
fi

# 3) Build the site to verify
echo "Running pnpm install & pnpm build..."
pnpm install
pnpm build

echo "Fix script complete. Commit and push these changes."

