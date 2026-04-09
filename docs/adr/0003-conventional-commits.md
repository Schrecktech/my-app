# ADR-0003: Use Conventional Commits

**Status:** Accepted
**Date:** 2026-04-09

## Context

As the project grows and multiple agents/contributors work in parallel, commit history needs to be machine-readable and human-scannable. A standardized commit format enables automated changelog generation, semantic version bumping, and clear communication of intent.

## Decision

Adopt [Conventional Commits](https://www.conventionalcommits.org/) v1.0.0 for all commit messages.

Format: `<type>(<scope>): <description>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

Breaking changes indicated by `!` suffix or `BREAKING CHANGE:` footer.

## Consequences

- Commit history is self-documenting and filterable by type
- Changelog updates can be derived directly from commits
- Semantic version bumps can be automated: `feat` = minor, `fix` = patch, `!` = major
- All contributors (human and AI) must follow the format
- Slightly more effort per commit message, but pays off in clarity
