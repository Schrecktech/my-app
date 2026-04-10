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

# Build iOS (cloud, requires EAS login)
npx eas-cli build --platform ios --profile preview

# Build Android (cloud)
npx eas-cli build --platform android --profile preview
```

## Project Structure

```
app/                    # File-based routes (Expo Router)
  _layout.tsx           # Root layout (navigation shell)
  (tabs)/
    _layout.tsx         # Tab navigator config + tab labels (i18n-ready)
    index.tsx           # Home screen with hero area
    explore.tsx         # About screen with info cards
  modal.tsx             # Modal screen
components/             # Reusable UI components
  parallax-scroll-view  # Safe-area-aware parallax header
  themed-text           # Theme-aware text component
  themed-view           # Theme-aware view component
constants/
  theme.ts              # THE theming file — all visual tokens live here
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

After committing, update `CHANGELOG.md` under `## [Unreleased]` using Keep a Changelog categories: Added, Changed, Deprecated, Removed, Fixed, Security.

## Versioning

[Semantic Versioning](https://semver.org/) v2.0.0: `MAJOR.MINOR.PATCH`
- MAJOR = incompatible changes, MINOR = new features, PATCH = bug fixes

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
- **Backlogged:** Screen rotation support, dynamic type scaling for all components

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

## Backlog (Do Not Implement Unless Asked)

- Ordering menu + POS checkout
- Rewards / loyalty program
- Location-based features (geofencing)
- Push notifications
- Bluetooth + WiFi detection for onsite customers
- Social media integration (pull/post/share)
- Screen rotation responsiveness
- Dynamic text size accessibility scaling
