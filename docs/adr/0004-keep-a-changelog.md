# ADR-0004: Keep a Changelog

**Status:** Accepted
**Date:** 2026-04-09

## Context

Users, collaborators, and agents need a human-readable summary of what changed between versions. Git log is too granular; release notes are too sparse. A structured changelog bridges the gap.

## Decision

Maintain `CHANGELOG.md` in the project root following [Keep a Changelog](https://keepachangelog.com/) v1.1.0.

Categories: Added, Changed, Deprecated, Removed, Fixed, Security.

New entries go under `## [Unreleased]`. When a version is released, unreleased entries move to a versioned section with a date.

## Consequences

- Every notable change is recorded in one predictable place
- Categories make it easy to scan for specific types of changes
- Agents can read the changelog to understand recent project evolution
- Requires discipline to update with each commit (or batch before release)
- Complements conventional commits — commits are granular, changelog is curated
