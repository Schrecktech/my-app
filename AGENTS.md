# AGENTS.md

Context and instructions for AI coding agents working on this project.

## Project Overview

Cross-platform mobile app built with **React Native + Expo** (SDK 54, RN 0.81).
Targets **iOS, Android, and Web** from a single TypeScript codebase.
Uses **Expo Router** for file-based routing and **EAS Build** for cloud builds.

The app is currently an MVP template — a clean, themeable starter with no specific
brand identity yet. The architecture is designed for rapid visual iteration
(CSS Zen Garden approach: change one file, restyle everything).

## Build and Test Commands

```bash
# Install dependencies
npm install

# Start dev server (press w=web, i=iOS, a=Android)
npx expo start

# Type-check
npx tsc --noEmit

# Lint
npx expo lint

# Generate changelog (unreleased entries)
npm run changelog

# Release (auto-detect version, bump, changelog, tag, push, GitHub Release)
npm run release

# Build iOS (cloud, requires EAS login)
npx eas-cli build --platform ios --profile preview

# Build Android (cloud)
npx eas-cli build --platform android --profile preview
```

## Project Structure

```
app/                    # File-based routes (Expo Router)
  _layout.tsx           # Root layout (Stack navigator)
  modal.tsx             # Modal screen
  (drawer)/
    _layout.tsx         # Drawer navigator (hamburger menu + header)
    profile.tsx         # Profile screen (editable, not wired)
    activity.tsx        # Activity hub (messages, transactions, security)
    settings.tsx        # Settings (appearance, notifications, language)
    activity/
      _layout.tsx       # Activity stack navigator
      messages.tsx      # Messages placeholder
      transactions.tsx  # Transactions placeholder
      security-history.tsx # Security history placeholder
    (tabs)/
      _layout.tsx       # Tab navigator config + tab labels (i18n-ready)
      index.tsx         # Home screen with hero area
      explore.tsx       # About screen with info cards
components/             # Reusable UI components
  parallax-scroll-view  # Safe-area-aware parallax header
  themed-text           # Theme-aware text component
  themed-view           # Theme-aware view component
constants/
  theme.ts              # THE theming file — all visual tokens live here
  i18n.ts               # i18n setup with locale detection and language override
  locales/
    en.ts               # English strings
docs/
  adr/                  # Architecture Decision Records
```

## Commit Messages (Conventional Commits)

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) v1.0.0.

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
Scopes: `theme`, `home`, `about`, `nav`, `build`, `docs`, `adr`
Breaking changes: append `!` after type/scope

After committing, run `npm run changelog` to auto-generate the `[Unreleased]` section from conventional commits via git-cliff.

## Versioning

[Semantic Versioning](https://semver.org/) v2.0.0: `MAJOR.MINOR.PATCH`
- MAJOR = incompatible changes, MINOR = new features, PATCH = bug fixes

**To release:** Run `npm run release`. This automatically:
- Detects the next version from conventional commits (feat=minor, fix=patch, breaking=major)
- Bumps `app.json` (expo.version, ios.buildNumber, android.versionCode) and `package.json`
- Android versionCode uses minutes since Unix epoch (deterministic, traceable)
- Generates the changelog via git-cliff
- Commits as `chore(release): vX.Y.Z`, tags, pushes, and creates a GitHub Release

Note: releases must be at least 1 minute apart (versionCode granularity).

## Parallel Work (Git Worktree)

Use `git worktree` for isolated parallel development:
- `git worktree add ../my-app-<name> -b <type>/<name>`
- One branch per worktree, run `npm install` in each
- Clean up: `git worktree remove ../my-app-<name>`

See `docs/DEVELOPER_GUIDE.md` for full workflow details.

## Code Style Guidelines

- **TypeScript** — strict mode, no `any` unless unavoidable
- **Theming** — never hardcode colors, spacing, or radii in components. Always import from `constants/theme.ts`
- **Semantic color names** — use `colors.surface`, `colors.hero`, `colors.textSecondary` etc., not raw hex values
- **Spacing scale** — use `Spacing.sm`, `Spacing.md`, `Spacing.lg` from theme, not magic numbers
- **File-based routing** — screens go in `app/`, components go in `components/`
- **i18n** — all user-facing strings go in `constants/locales/en.ts`, never hardcoded in components. Use `i18n.t('namespace.key')` to reference them.

## Theming System

The entire app's visual identity is controlled by `constants/theme.ts`:

- `Brand` — 4 color values to instantly rebrand
- `Colors` — light/dark mode with semantic tokens
- `Spacing` — xs(4) sm(8) md(16) lg(24) xl(32) xxl(48)
- `Radii` — sm(6) md(12) lg(20) full(9999)
- `Fonts` — platform-aware font stacks

**Rule:** To restyle the app, only edit `constants/theme.ts`. If a component needs a new token, add it to the theme file first, then reference it.

## Accessibility

- Hero text uses `adjustsFontSizeToFit` and `numberOfLines` to handle large text sizes
- Parallax header accounts for iOS safe area inset (status bar)
- Tab bar icons are sized to fill available space without exceeding bounds
- Screen rotation supported — layouts adapt via `useWindowDimensions()`

## Security Considerations

- No secrets in the codebase — credentials managed via EAS environment variables
- No user input handling yet — when added, sanitize all inputs
- HTTPS only for any future API calls

## Architecture Decisions

See `docs/adr/` for recorded decisions. Current ADRs:
- 0000: Use ADRs for architectural decisions
- 0001: React Native + Expo as framework
- 0002: Centralized theming system
- 0003: Conventional Commits
- 0004: Keep a Changelog
- 0005: Semantic Versioning
- 0006: Git worktree for parallel/multi-agent development
- 0007: Gitleaks secret scanning
- 0008: EAS build and deployment
- 0009: Dynamic text size accessibility scaling
- 0010: Drawer navigation with header bar
- 0011: Screen rotation responsiveness
- 0012: Automated changelog with git-cliff

## Backlog (Do Not Implement Unless Asked)

- Ordering menu + POS checkout
- Rewards / loyalty program
- Location-based features (geofencing)
- Push notifications
- Bluetooth + WiFi detection for onsite customers
- Social media integration (pull/post/share)
- Backend wiring for Profile edits
- Backend wiring for notification preferences
- Shopping cart icon in header
- Logout with actual auth flow
- Messages, Transactions, Security History real data
- Unit testing (Jest + React Native Testing Library)
- End-to-end testing (Detox or Maestro)
