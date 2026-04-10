# Automated Changelog Generation with git-cliff

**Date:** 2026-04-10
**Status:** Approved

## Summary

Replace manual CHANGELOG.md editing with git-cliff, a tool that reads conventional commits and generates Keep a Changelog-formatted output. Existing hand-written changelog entries are preserved; git-cliff only generates entries going forward from v0.6.0.

## Decisions

- **Trigger:** npm scripts (manual), not hooks
- **History:** Preserve existing entries, generate forward only from v0.6.0
- **Commit type mapping:** feat→Added, fix→Fixed, perf/refactor→Changed, breaking→Changed, security→Security, deprecate→Deprecated. Omit docs, style, test, build, ci, chore.
- **Installation:** `git-cliff` npm package as a devDependency

## Configuration: `cliff.toml`

Single config file at project root:

- Keep a Changelog template with standard header
- Commit groups mapped per the table above
- Scoped to process commits from the latest tag onward for `[Unreleased]`
- Tag pattern matching semver tags (e.g., `v0.6.0`)

## npm Scripts

Two scripts in `package.json`:

- **`npm run changelog`** — `git-cliff --unreleased --prepend CHANGELOG.md`
  - Regenerates only the `[Unreleased]` section
  - Prepends to existing file, preserving all history below
  - Safe to run anytime to preview accumulated changes
- **`npm run release`** — `git-cliff --tag <version> --prepend CHANGELOG.md`
  - Converts `[Unreleased]` entries into a versioned section
  - Run as part of the version bump workflow
  - Version numbers still bumped manually in app.json (x3) and package.json

## Migration Strategy

1. Create a `v0.6.0` git tag on the commit that bumped to v0.6.0 (currently `e3b40e1`) — no tags exist yet and git-cliff needs them for version boundaries
2. Configure git-cliff to process commits from `v0.6.0` onward
3. Existing hand-written changelog content below `[Unreleased]` stays untouched
4. First run of `npm run changelog` populates `[Unreleased]` with commits since `v0.6.0`
5. Historical tags for earlier versions (v0.1.0–v0.5.0) are optional but not required

## Documentation Updates

- **AGENTS.md:**
  - Replace manual "update CHANGELOG.md under [Unreleased]" with `npm run changelog`
  - Add `npm run release -- --tag vX.Y.Z` to the version bump checklist
  - Remove "Automated changelog generation with git-cliff" from backlog
- **DEVELOPER_GUIDE.md:**
  - Add a "Changelog" section explaining both commands and when to use each
- **ADR-0012:**
  - Record adoption of git-cliff for automated changelog generation

## Out of Scope

- Full release automation (version bumps remain manual)
- Retroactive regeneration of historical changelog entries
- Pre-commit hook integration
- CI/CD changelog generation
