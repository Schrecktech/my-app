# ADR-0005: Use Semantic Versioning

**Status:** Accepted
**Date:** 2026-04-09

## Context

The app targets multiple platforms (iOS, Android, Web) and will eventually be distributed via app stores. A clear versioning scheme communicates the nature of changes to users, stores, and automated systems.

## Decision

Adopt [Semantic Versioning](https://semver.org/) v2.0.0.

Format: `MAJOR.MINOR.PATCH`

- **MAJOR** — incompatible changes (navigation overhaul, data migration required)
- **MINOR** — new features, backward compatible (new tab, new screen)
- **PATCH** — bug fixes, backward compatible (text clipping fix, styling tweak)

Pre-release versions use hyphen notation: `1.0.0-alpha.1`

EAS manages build numbers remotely (`"appVersionSource": "remote"` in `eas.json`). The logical version is tracked in `CHANGELOG.md` and `package.json`.

## Consequences

- Version numbers communicate intent to users and app store reviewers
- Automated version bumping can derive from conventional commits
- App store submissions have predictable version progression
- EAS remote versioning avoids manual build number conflicts
