#!/usr/bin/env bash
# Regenerate the [Unreleased] section in CHANGELOG.md from conventional commits.
# Safe to run repeatedly — strips any existing [Unreleased] section before prepending.

set -euo pipefail

CHANGELOG="CHANGELOG.md"

# Remove existing [Unreleased] section (from "## [Unreleased]" to the next "## [" heading)
if grep -q '## \[Unreleased\]' "$CHANGELOG"; then
  sed -i '/^## \[Unreleased\]/,/^## \[/{/^## \[Unreleased\]/d;/^## \[/!d}' "$CHANGELOG"
fi

# Prepend freshly generated unreleased section
npx git-cliff --unreleased --prepend "$CHANGELOG"
