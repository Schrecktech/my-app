# ADR-0000: Use Architecture Decision Records

**Status:** Accepted
**Date:** 2026-04-09

## Context

We need a way to track architectural decisions across sessions, machines, and collaborators. ADRs provide a lightweight, versioned record that lives alongside the code.

## Decision

Use ADRs in `docs/adr/` following the numbered format `NNNN-short-title.md`. Each record captures context, the decision, and consequences.

## Consequences

- Decisions are discoverable via git history and file browsing
- New collaborators (human or AI) can understand *why* things are the way they are
- Low overhead: one markdown file per decision
