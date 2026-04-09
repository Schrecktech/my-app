# ADR-0006: Git Worktree for Parallel and Multi-Agent Development

**Status:** Accepted
**Date:** 2026-04-09

## Context

This project uses AI agents (Claude Code and others) that can work on independent tasks in parallel. Standard git branching requires switching context (stashing, checking out), which is error-prone when multiple agents operate simultaneously. We need isolated working copies that share the same git history.

## Decision

Use `git worktree` for parallel development. Each feature, fix, or agent task gets its own worktree with a dedicated branch.

Conventions:
- Worktrees live as sibling directories (e.g., `../my-app-feature-name`)
- Branch names use conventional commit type prefixes: `feat/`, `fix/`, `docs/`, `refactor/`
- One branch per worktree — never shared
- Each worktree runs its own `npm install`
- Worktrees are removed after merge with `git worktree remove`

## Consequences

- Multiple agents can work on independent features without conflicts
- No stashing or context-switching needed
- Full git history is shared across all worktrees (commits, branches, tags)
- Disk usage increases (each worktree has its own `node_modules`)
- Requires discipline to clean up finished worktrees
- Merge conflicts are resolved when branches converge, not during development
