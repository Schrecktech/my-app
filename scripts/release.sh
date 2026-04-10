#!/usr/bin/env bash
# Automated release: detect version, bump files, changelog, commit, tag, push, GitHub release.
#
# Usage: npm run release
#
# NOTE: Releases must be at least 1 minute apart. The Android versionCode uses
# minutes since Unix epoch, so two releases within the same minute would produce
# identical versionCode values.

set -euo pipefail

# Abort if working tree is dirty
if [ -n "$(git status --porcelain)" ]; then
  echo "Error: Working tree is dirty. Commit or stash changes before releasing."
  exit 1
fi

# Detect next version from conventional commits
VERSION=$(npx git-cliff --bumped-version 2>/dev/null)
VERSION_NUM="${VERSION#v}"  # strip leading v

if [ -z "$VERSION_NUM" ]; then
  echo "Error: Could not detect next version. Are there unreleased conventional commits?"
  exit 1
fi

echo "Releasing ${VERSION} (${VERSION_NUM})..."

# Calculate Android versionCode: minutes since Unix epoch of the current commit time
# This is deterministic and traceable — the same release always produces the same code.
EPOCH_SECONDS=$(date +%s)
VERSION_CODE=$((EPOCH_SECONDS / 60))

echo "  Version: ${VERSION_NUM}"
echo "  Android versionCode: ${VERSION_CODE} (minutes since epoch)"

# Bump app.json: expo.version
node -e "
const fs = require('fs');
const app = JSON.parse(fs.readFileSync('app.json', 'utf8'));
app.expo.version = '${VERSION_NUM}';
app.expo.ios.buildNumber = '${VERSION_NUM}';
app.expo.android.versionCode = ${VERSION_CODE};
fs.writeFileSync('app.json', JSON.stringify(app, null, 2) + '\n');
"

# Bump package.json: version
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '${VERSION_NUM}';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Sync package-lock.json with the updated package.json version
npm install --package-lock-only

# Generate changelog with the new version
npx git-cliff --bump --output CHANGELOG.md 2>/dev/null

# Commit, then tag
git add app.json package.json package-lock.json CHANGELOG.md
git commit -m "chore(release): ${VERSION}"
git tag "${VERSION}"
git push
git push origin "${VERSION}"

# Create GitHub Release with changelog for this version
RELEASE_NOTES=$(npx git-cliff --latest --strip header 2>/dev/null)
gh release create "${VERSION}" --title "${VERSION}" --notes "${RELEASE_NOTES}"

echo ""
echo "Released ${VERSION} successfully!"
echo "  - Version bumped in app.json, package.json, and package-lock.json"
echo "  - CHANGELOG.md updated"
echo "  - Tagged and pushed"
echo "  - GitHub Release created"
