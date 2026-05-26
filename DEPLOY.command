#!/bin/bash
# GothCorset DZ — one-click GitHub + Vercel deploy
# Double-click this file from Finder to run in Terminal

cd "$(dirname "$0")"
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   GothCorset DZ — Deploy Script          ║"
echo "║   Built by Arko Digital                  ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── STEP 1: Clean git init ────────────────────────────────────
echo "▶ STEP 1 — Git setup..."
rm -rf .git
git init
git checkout -b main 2>/dev/null || git branch -m master main
git config user.email "touhami.yacine31@gmail.com"
git config user.name "Yacine Touhami"
git add -A
git commit -m "feat: GothCorset DZ — launch with real Instagram product images

- 17 images (14 IG posts + 3 editorial shots)
- Hero background, product cards, collections, IG grid all real photos
- Built by Arko Digital"
echo "  ✓ Committed"
echo ""

# ── STEP 2: GitHub ────────────────────────────────────────────
echo "▶ STEP 2 — Pushing to GitHub..."
if ! command -v gh &>/dev/null; then
  echo "  ⚠  GitHub CLI not found. Install it first:"
  echo "     brew install gh && gh auth login"
  echo "     Then run this script again."
  echo ""
  read -n 1 -p "Press any key to exit..."; echo; exit 1
fi

if ! gh auth status &>/dev/null; then
  echo "  ⚠  Not logged into GitHub. Run: gh auth login"
  echo "     Then run this script again."
  echo ""
  read -n 1 -p "Press any key to exit..."; echo; exit 1
fi

GITHUB_USER=$(gh api user -q .login)
REPO_NAME="gothcorset-dz"
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}"

if gh repo view "${GITHUB_USER}/${REPO_NAME}" &>/dev/null; then
  git remote add origin "${REPO_URL}.git" 2>/dev/null || \
    git remote set-url origin "${REPO_URL}.git"
  git push -u origin main --force
else
  gh repo create "${REPO_NAME}" \
    --public \
    --description "GothCorset DZ — Dark Fashion 4 Haunted Souls · Built by Arko Digital" \
    --source=. --remote=origin --push
fi
echo "  ✓ Pushed → ${REPO_URL}"
echo ""

# ── STEP 3: Vercel ────────────────────────────────────────────
echo "▶ STEP 3 — Deploying to Vercel..."
VERCEL_BIN=""
if command -v vercel &>/dev/null; then
  VERCEL_BIN="vercel"
elif command -v npx &>/dev/null; then
  VERCEL_BIN="npx vercel@latest"
fi

if [ -z "$VERCEL_BIN" ]; then
  echo "  ⚠  Vercel CLI not found and npx unavailable."
  echo "     Install: npm i -g vercel"
  echo "     Then run: vercel deploy --prod"
else
  $VERCEL_BIN deploy --prod --yes \
    --name gothcorset-dz \
    --scope touhamiyacine31-1917s-projects 2>&1
  echo "  ✓ Deployed to Vercel!"
fi

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   Done! Dark fashion is live 🖤           ║"
echo "╚══════════════════════════════════════════╝"
echo ""
read -n 1 -p "Press any key to close..."
echo ""
