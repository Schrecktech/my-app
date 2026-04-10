# ADR-0011: Screen Rotation Responsiveness

**Status:** Accepted
**Date:** 2026-04-10

## Context

The app was locked to portrait orientation (`"orientation": "portrait"` in `app.json`). Users on tablets or who prefer landscape had no option to rotate. Accessibility guidelines recommend supporting both orientations.

## Decision

Unlock rotation by setting `"orientation": "default"` in `app.json`. Use `useWindowDimensions()` to detect landscape (`width > height`) and adapt specific layouts:

- **Parallax header:** Reduce height to 60% in landscape to preserve vertical content space
- **Home screen cards:** Display side-by-side (2-column) in landscape instead of stacked
- **All other screens:** No changes needed — vertical ScrollView with flexbox adapts naturally

No custom hooks or context providers. `useWindowDimensions()` is built-in and reactive to rotation changes.

## Consequences

- App rotates freely on all platforms (iOS, Android, Web)
- Most screens adapt automatically via flexbox
- Home screen and parallax header have landscape-optimized layouts
- Drawer and tab navigators handle rotation natively
- No orientation lock means the app must look reasonable at any aspect ratio
