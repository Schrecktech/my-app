# ADR-0001: Use React Native with Expo for Cross-Platform App

**Status:** Accepted
**Date:** 2026-04-09

## Context

Need a single codebase targeting Android, iOS, and Web. Key requirement: easy setup, fast iteration, and the ability to restyle without restructuring (CSS Zen Garden approach).

Evaluated five frameworks:
- **React Native + Expo** — JS/TS, strong web support, easiest setup
- **Flutter** — Dart, good web (no SEO), must learn new language
- **Ionic + Capacitor** — best web story, WebView performance ceiling
- **Kotlin Multiplatform** — web support is beta-only
- **.NET MAUI** — no web target

## Decision

Use React Native with Expo (SDK 54) and Expo Router for file-based routing. Use EAS Build for iOS cloud builds from Linux. TypeScript for type safety.

## Consequences

- Single codebase for all three platforms with production-ready web support
- No new language to learn (JavaScript/TypeScript)
- Can build iOS without a Mac via EAS cloud builds
- Web is a secondary target — complex web-specific UIs may need platform code
- Locked into Expo's ecosystem for native module management
