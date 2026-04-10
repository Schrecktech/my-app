# ADR-0012: Automated Changelog with git-cliff

**Status:** Accepted
**Date:** 2026-04-10

## Context

The project follows Keep a Changelog and Conventional Commits. Maintaining the changelog manually after each commit is error-prone and tedious. The backlog identified automated changelog generation as a desired improvement.

## Decision

Adopt git-cliff to generate changelog entries from conventional commits. Configuration lives in `cliff.toml` at the project root. Two npm scripts provide the interface:

- `npm run changelog` — regenerates the `[Unreleased]` section from commits since the latest tag
- `npm run release -- vX.Y.Z` — converts unreleased entries into a versioned section

Existing hand-written changelog entries (v0.1.0–v0.6.0) are preserved. git-cliff only generates entries for commits after the `v0.6.0` tag.

Commit types map to Keep a Changelog categories: feat→Added, fix→Fixed, perf/refactor→Changed, security→Security, deprecate→Deprecated. Types docs, style, test, build, ci, and chore are omitted from the changelog.

## Consequences

- No more manual changelog writing — `npm run changelog` generates it from commits
- Commit message quality matters more — messages appear directly in the changelog
- Version bumps still require manual updates to app.json and package.json
- The `release` script handles changelog versioning but does not automate tagging or publishing
- New dev dependency: `git-cliff` (npm package, Rust binary)
