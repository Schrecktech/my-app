# ADR-0009: Dynamic Text Size Accessibility Scaling

**Status:** Accepted
**Date:** 2026-04-10

## Context

iOS Dynamic Type and Android font scaling allow users to set system-wide text size preferences. The app used fixed font sizes and fixed-height containers that clipped or broke at large text sizes (observed at 160% on iOS).

## Decision

- Apply `maxFontSizeMultiplier={2}` globally via `ThemedText` to cap scaling at 2x
- Add the cap value as a theme token (`Accessibility.maxFontSizeMultiplier`) for easy adjustment
- Ensure all `ThemedText` styles include explicit `lineHeight` to prevent ascender clipping
- Scale the parallax header height proportionally with `PixelRatio.getFontScale()`
- Use `flexWrap` on modal rows to handle text overflow gracefully

## Consequences

- Text scales with system preferences up to 2x, beyond which it caps
- Layouts flex instead of clipping at large sizes
- The 2x cap means extremely large accessibility sizes (3x+) won't scale further — acceptable trade-off to prevent layout breakage
- Theme token allows easy adjustment of the cap if needed
