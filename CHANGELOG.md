# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-04-10

### Added

- Debug Info modal with build details (version, build ID, SDK, platform, OS, bundle ID)
- Tappable version label on About screen that opens debug modal
- AGENTS.md for AI agent context following [agents.md](https://agents.md) spec
- Project-level `.claude/settings.json` with recommended plugins
- `docs/DEVELOPER_GUIDE.md` covering full development cycle
- Conventional Commits, Keep a Changelog, and Semantic Versioning standards
- Git worktree workflow for multi-agent parallel development
- Quality gates table with current and planned tooling
- ADR-0007: Gitleaks secret scanning
- ADR-0008: EAS build and deployment
- Gitleaks as active quality gate
- Production dependency audit (`npm audit --omit=dev`) as active quality gate
- `eas-cli` as project dev dependency for reproducibility
- Local macOS build instructions in developer guide

### Changed

- Version bumped to 0.3.0 across package.json, app.json, and changelog
- Build info moved from About screen footer to dedicated Debug Info modal
- Developer guide expanded with commit format, changelog process, versioning, and worktree workflows
- All `eas` commands use `npx eas` prefix (no global install needed)
- EAS CLI version pinned to 18.5.0 in eas.json

### Fixed

- Hero title text clipping with explicit lineHeight
- Duplicate `npx npx` in developer guide
- Git author/committer email corrected across all commits

## [0.2.0] - 2026-04-09

### Added

- Architecture Decision Records in `docs/adr/` (ADR-0000 through ADR-0002)
- `eas.json` with development, preview, and production build profiles
- Remote version source for EAS builds

### Changed

- Parallax header accounts for iOS safe area inset (status bar)
- Hero text uses `adjustsFontSizeToFit` to handle large accessibility text sizes
- Tab bar icons increased from 28px to 32px
- Tab labels extracted to `TAB_LABELS` constant for multilingual support
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
