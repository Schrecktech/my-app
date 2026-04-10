# Screen Rotation Responsiveness — Design Spec

**Date:** 2026-04-10
**Status:** Approved

## Goal

Make the app respond to device rotation on all platforms (iOS, Android, Web). Most screens adapt automatically via flexbox; only the Home screen hero and parallax header need landscape-specific adjustments.

## Changes

### 1. Unlock rotation
- `app.json`: change `"orientation": "portrait"` to `"orientation": "default"`

### 2. Parallax header — reduce height in landscape
- `components/parallax-scroll-view.tsx`: use `useWindowDimensions()` to detect landscape (`width > height`) and reduce header height (e.g., 60% of portrait height) since vertical space is limited in landscape

### 3. Home screen — 2-column cards in landscape
- `app/(drawer)/(tabs)/index.tsx`: use `useWindowDimensions()` to detect landscape and render the two cards side-by-side (`flexDirection: 'row'`) instead of stacked

### 4. No changes needed
- About, Settings, Profile, Activity, Modal — all use vertical ScrollView with flexbox, adapt naturally
- Drawer and tab navigators handle rotation natively

## Housekeeping
- Create ADR-0011 for screen rotation
- Remove "Screen rotation responsiveness" from AGENTS.md backlog
- Update CHANGELOG.md with v0.6.0 section
- Bump version to 0.6.0 in app.json, package.json (all 4 locations)
