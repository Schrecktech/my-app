# ADR-0002: Centralized Theme System for Restyling

**Status:** Accepted
**Date:** 2026-04-09

## Context

The app needs to be easy to restyle without touching screen components — inspired by CSS Zen Garden. A future brand identity is undecided, so the template must support rapid visual iteration.

## Decision

All visual tokens (colors, spacing, border radii, fonts) live in a single file: `constants/theme.ts`. Screen components import from this file and never hardcode visual values. The theme includes:

- `Brand` object — 4 values to change for instant rebranding
- `Colors` — light/dark mode with semantic names (hero, surface, accent, border)
- `Spacing` — xs through xxl scale
- `Radii` — consistent border radius tokens
- `Fonts` — platform-aware font stacks

## Consequences

- Rebranding is a single-file change
- Dark mode works automatically via semantic color tokens
- All screens stay visually consistent
- Adding new theme tokens requires updating one file, not hunting through components
