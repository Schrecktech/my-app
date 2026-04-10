# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2026-04-10

### Added

- Screen rotation support — app rotates freely on all platforms
- Landscape layout for Home screen cards (2-column side-by-side)
- ADR-0011: Screen rotation responsiveness

### Changed

- Orientation unlocked from portrait-only to default (all orientations)
- Parallax header height reduces to 60% in landscape to preserve content space

## [0.5.0] - 2026-04-10

### Added

- Drawer navigation (hamburger menu) wrapping existing tab navigator
- Header bar with hamburger icon (left) and profile shortcut (right)
- Profile screen with avatar, member ID, and editable name/email/phone fields
- Activity hub screen with navigation to Messages, Transactions, and Security History
- Messages, Transactions, and Security History placeholder screens
- Settings screen with dark mode toggle, notification toggles, and language picker
- Language override with "Device Default" option (persisted via AsyncStorage)
- ADR-0010: Drawer navigation with header bar
- New icon mappings for drawer, profile, activity, and settings icons
- i18n strings for all new screens (drawer, profile, activity, settings)

### Changed

- Route structure: `(tabs)/` now nested inside `(drawer)/`
- Root layout points to `(drawer)` instead of `(tabs)`
- i18n system extended with `loadLanguagePreference`, `setLanguagePreference`, `getAvailableLanguages`
- App startup loads stored language preference before rendering

### Added to Backlog

- Backend wiring for Profile edits
- Backend wiring for notification preferences
- Shopping cart icon in header
- Logout with actual auth flow
- Messages, Transactions, Security History real data

## [0.4.0] - 2026-04-10

### Added

- Dynamic text size accessibility scaling — respects iOS Dynamic Type and Android font scale
- `Accessibility.maxFontSizeMultiplier` theme token (default: 2x cap)
- ADR-0009: Dynamic text size accessibility scaling

### Changed

- ThemedText applies `maxFontSizeMultiplier` globally with explicit lineHeight on all type variants
- Parallax header height scales proportionally with system font size
- Modal debug rows wrap gracefully at large text sizes
- Hero text center-aligned for better wrapping at scaled sizes

### Fixed

- Text clipping at large accessibility text sizes (160%+)

## [0.3.0] - 2026-04-10

### Added

- Internationalization (i18n) with `i18n-js` and `expo-localization` — all user-facing strings in `constants/locales/en.ts`
- Debug Info modal accessible via tappable `vX.Y.Z` on About screen
- Dynamic build ID from git commit hash (`<ISO date>-<short hash>`)
- Build artifact output to `build/` directory with commit-based naming
- Web icon mapping for cross-platform icon support
- iOS Simulator instructions in developer guide
- AGENTS.md for AI agent context following [agents.md](https://agents.md) spec
- Project-level `.claude/settings.json` with recommended plugins
- `docs/DEVELOPER_GUIDE.md` covering full development cycle
- Conventional Commits, Keep a Changelog, and Semantic Versioning standards
- Git worktree workflow for multi-agent parallel development
- Quality gates table with current and planned tooling
- ADR-0007: Gitleaks secret scanning
- ADR-0008: EAS build and deployment
- ADR for i18n adoption
- Gitleaks as active quality gate
- Production dependency audit (`npm audit --omit=dev`) as active quality gate
- Local macOS build instructions in developer guide

### Changed

- Renamed `explore.tsx` to `about.tsx` to match tab label
- Tab labels, screen titles, and all UI text wired through i18n
- Modal redesigned: shows version, build ID, platform, OS version, Expo SDK
- Modal dismiss uses `router.back()` to return to originating screen
- Build info removed from About screen footer, replaced by subtle version tap
- Reduced parallax header height for better proportions on web
- All `eas` commands use `npx eas-cli` (no global install needed)
- EAS CLI version pinned in `eas.json`
- Version bumped to 0.3.0 across package.json, app.json, and changelog
- Git author/committer email corrected across all commits

### Fixed

- Hero title text clipping with explicit lineHeight and vertical padding
- Duplicate `npx npx` in developer guide
- Replaced `npx eas` with `npx eas-cli` to avoid namesquatting risk
- Web platform icon rendering

## [0.2.0] - 2026-04-09

### Added

- Architecture Decision Records in `docs/adr/` (ADR-0000 through ADR-0002)
- `eas.json` with development, preview, and production build profiles
- Remote version source for EAS builds
- Build info section on About screen for deployment verification

### Changed

- Parallax header accounts for iOS safe area inset (status bar)
- Hero text uses `adjustsFontSizeToFit` to handle large accessibility text sizes
- Tab bar icons increased from 28px to 32px
- Tab labels extracted to constant for multilingual support
- Removed `.superpowers/` from `.gitignore` to preserve brainstorming artifacts

### Fixed

- Hero text ("Your Brand") no longer clipped by iOS status bar at any text size

## [0.1.0] - 2026-04-09

### Added

- Expo SDK 54 project with React Native 0.81 and TypeScript
- Centralized theme system in `constants/theme.ts` (Brand, Colors, Spacing, Radii, Fonts)
- Home screen with hero area and content cards
- About screen with hours, contact, and location cards
- Tab navigation (Home + About)
- Light/dark mode support
- EAS Build configuration linked to Expo project
- Expo Router file-based routing with typed routes
- React Compiler enabled

### Changed

- Replaced Expo tutorial content with clean branded template
- Renamed "Explore" tab to "About" with info.circle.fill icon

## [0.0.0] - 2026-04-09

### Added

- Initial Expo project scaffold from `create-expo-app`
