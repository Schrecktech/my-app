# Developer Guide

Development cycle for this Expo cross-platform app (iOS, Android, Web).

## Prerequisites

- **Node.js** LTS (v20+)
- **npm** (comes with Node)
- **Expo Go** app on your phone (for quick device testing)
- **Git** — version control
- **gitleaks** — secret scanning (install: `brew install gitleaks` or see https://github.com/gitleaks/gitleaks)
- **git-cliff** — changelog generation (installed automatically via `npm install`)

Note: **EAS CLI** is managed via `npx eas-cli` — no global or local install needed. The minimum version is enforced by the `cli.version` field in `eas.json`.

Optional (for local iOS builds on macOS):
- **Xcode** — iOS simulator + local builds (macOS only)
- **CocoaPods** — `sudo gem install cocoapods` or `brew install cocoapods`
- **Fastlane** — `brew install fastlane` (used by EAS for signing)

Optional (for Android):
- **Android Studio** — Android emulator + local builds

## First-Time Setup

```bash
# Clone the repo
git clone https://github.com/Schrecktech/my-app.git
cd my-app

# Install dependencies
npm install

# Log in to Expo (needed for EAS builds)
npx eas-cli login
```

## Development Cycle

### 1. Start the Dev Server

```bash
npx expo start
```

This launches Metro bundler. From the terminal menu:
- Press **w** to open in your web browser
- Press **i** to open iOS simulator (Mac only)
- Press **a** to open Android emulator
- Scan the **QR code** with Expo Go on your phone

Changes to `.tsx` files hot-reload automatically.

### 2. Make Changes

**Screens** live in `app/`. Expo Router uses file-based routing:
- `app/(tabs)/index.tsx` — Home tab (`/`)
- `app/(tabs)/explore.tsx` — About tab (`/explore`)
- `app/modal.tsx` — Modal screen

**Components** live in `components/`.

**Theming** — edit `constants/theme.ts` to change colors, spacing, fonts, or radii globally. Never hardcode visual values in components.

### 3. Validate Before Committing

```bash
# Type-check (must pass with zero errors)
npx tsc --noEmit

# Lint (must pass with zero warnings)
npx expo lint
```

Both must be clean before committing.

### 4. Commit (Conventional Commits)

This project follows [Conventional Commits](https://www.conventionalcommits.org/) v1.0.0.

**Format:**

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

| Type | When to use |
|------|-------------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system or external dependency changes |
| `ci` | CI/CD configuration |
| `chore` | Maintenance tasks |

**Scopes** (optional, use when helpful):

`theme`, `home`, `about`, `nav`, `build`, `docs`, `adr`

**Examples:**

```bash
git commit -m "feat(theme): add accent color token for CTAs"
git commit -m "fix(home): prevent hero text clipping at large font sizes"
git commit -m "docs(adr): record decision to use Expo Router"
```

**Breaking changes:** Add `!` after the type/scope, or include `BREAKING CHANGE:` in the footer:

```bash
git commit -m "feat(nav)!: replace tab navigation with drawer"
```

### 5. Update the Changelog

After committing, regenerate the changelog:

```bash
npm run changelog
```

This runs git-cliff to auto-generate the `## [Unreleased]` section from your conventional commits. Only `feat`, `fix`, `perf`, `refactor`, `security`, and `deprecate` commits appear — others (docs, style, test, build, ci, chore) are omitted.

The changelog is fully regenerated from commit history each time — it's a pure function of your git log and tags.

**At release time**, run:

```bash
npm run release
```

This single command:
1. Detects the next semantic version from conventional commits (feat=minor, fix=patch, breaking=major)
2. Bumps version in `app.json` (expo.version, ios.buildNumber, android.versionCode) and `package.json`
3. Generates the changelog with the new version
4. Commits as `chore(release): vX.Y.Z`, tags, and pushes
5. Creates a GitHub Release with release notes

Android `versionCode` uses minutes since Unix epoch — deterministic and traceable from the commit timestamp. Releases must be at least 1 minute apart.

### 6. Secret Scanning

Run gitleaks before pushing to catch any accidentally committed secrets:

```bash
gitleaks detect --source . --verbose
```

This is a required quality gate. Never push if leaks are detected.

### 7. Build for Devices

#### iOS — Local Build (macOS, fastest)

Requires macOS with Xcode, CocoaPods, and Fastlane installed.

```bash
# Build locally — typically 2-5 minutes
npx eas-cli build --platform ios --profile preview --local --output ./build/myapp-$(git rev-parse --short HEAD).ipa

# Install via: drag to Xcode Devices window, or use Apple Configurator
```

For development iteration with hot reload (build once, iterate fast):

```bash
# One-time: build the dev client locally
npx eas-cli build --platform ios --profile development --local --output ./build/myapp-$(git rev-parse --short HEAD).ipa

# Then start the dev server — changes appear instantly, no rebuild needed
npx expo start --dev-client
```

#### iOS — Simulator (macOS)

To run the app in the Xcode iOS Simulator without a device build:

```bash
npx expo start --ios
```

To test a local `.ipa` build in the simulator:

```bash
# Boot a simulator (if not already running)
xcrun simctl boot "iPhone 16"
open -a Simulator

# Install and launch
xcrun simctl install booted ./build/myapp-<commit-hash>.ipa
xcrun simctl launch booted com.scottschreckengaust.myapp
```

> **Note:** `.ipa` files built with the `preview` profile are signed for device distribution and may not install on the simulator. Use `npx expo start --ios` for simulator testing, or build with the `development` profile for simulator-compatible binaries.

#### iOS — Cloud Build (any OS)

Use when you don't have a Mac available, or for CI/CD.

```bash
npx eas-cli build --platform ios --profile preview
```

- **preview** — internal distribution, installs via QR/link
- **production** — App Store ready

The build runs in Expo's cloud (~10-15 min including queue). When done, you get a download link. On iPhone, open the link in Safari to install.

#### Android — Local Build (any OS)

Requires Android SDK (bundled with Android Studio).

```bash
npx eas-cli build --platform android --profile preview --local --output ./build/myapp-$(git rev-parse --short HEAD).apk
```

#### Android — Cloud Build (any OS)

```bash
npx eas-cli build --platform android --profile preview
```

Download the `.apk` and install on your device.

#### Web

```bash
npx expo export --platform web
```

Outputs static files to `dist/` for deployment to any web host.

### 8. Over-the-Air Updates (JS-only changes)

For changes that don't touch native code:

```bash
npx eas-cli update --branch preview --message "Description of update"
```

Users get the update without downloading a new build.

## Versioning (Semantic Versioning)

This project follows [Semantic Versioning](https://semver.org/) v2.0.0.

**Format:** `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)

| Increment | When |
|-----------|------|
| **MAJOR** | Incompatible API or UX changes (e.g., navigation overhaul) |
| **MINOR** | New features, backward compatible (e.g., add a new tab) |
| **PATCH** | Bug fixes, backward compatible (e.g., fix text clipping) |

**Pre-release:** Append hyphen + identifiers: `1.0.0-alpha.1`, `1.0.0-beta.2`

### Bumping the Version

Run `npm run release` — it handles everything automatically. The script updates all four version locations:

| File | Field | Format |
|------|-------|--------|
| `app.json` | `expo.version` | `MAJOR.MINOR.PATCH` |
| `app.json` | `expo.ios.buildNumber` | String, matches version |
| `app.json` | `expo.android.versionCode` | Integer, minutes since Unix epoch |
| `package.json` | `version` | `MAJOR.MINOR.PATCH` |

**Version source:** `appVersionSource` is `"local"` in `eas.json`, meaning build numbers come from `app.json`, not EAS remote. This keeps Xcode, the app, and the codebase in sync.

**Android `versionCode`:** Uses minutes since Unix epoch — deterministic, always increasing, and traceable to the release timestamp. Google Play requires this to be a positive integer below 2,100,000,000 (sufficient until ~2069). Releases must be at least 1 minute apart.

## Git Worktree Workflow (Multi-Agent / Parallel Development)

Use `git worktree` to work on multiple features simultaneously in isolated copies of the repo. This is essential for multi-agent and sub-agent workflows where parallel work must not conflict.

### When to Use Worktrees

- Working on multiple features in parallel
- AI agents working on independent tasks concurrently
- Testing a fix while feature work is in progress
- Reviewing a branch without switching context

### Creating a Worktree

```bash
# From the main repo, create a worktree for a feature branch
git worktree add ../my-app-feature-name -b feat/feature-name

# The worktree is a full working copy at ../my-app-feature-name
cd ../my-app-feature-name
npm install
```

### Worktree Conventions

- **Location:** Sibling directories to the main repo (e.g., `../my-app-feature-name`)
- **Branch naming:** `feat/`, `fix/`, `docs/`, `refactor/` prefixes matching conventional commit types
- **One branch per worktree** — never share branches across worktrees
- **Install dependencies** in each worktree (`npm install`) — `node_modules` is not shared
- **Clean up** when done:

```bash
# From any worktree or the main repo
git worktree remove ../my-app-feature-name

# Or list all worktrees
git worktree list
```

### Multi-Agent Workflow

When AI agents work in parallel:

1. Each agent gets its own worktree with an isolated branch
2. Agents work independently — no shared state
3. When done, each branch is merged back to `main` (or a PR is created)
4. Merge conflicts are resolved in the main repo

```bash
# Example: two agents working in parallel
git worktree add ../my-app-agent-1 -b feat/ordering-menu
git worktree add ../my-app-agent-2 -b feat/push-notifications
```

## Build Profiles

Defined in `eas.json`:

| Profile | Purpose | Distribution |
|---------|---------|-------------|
| `development` | Dev client with hot reload | Internal (your devices) |
| `preview` | Testing builds | Internal (share via link) |
| `production` | App Store / Play Store | Store |

## Adding a New Screen

1. Create `app/new-screen.tsx` (or `app/(tabs)/new-screen.tsx` for a tab)
2. Export a default React component
3. Expo Router auto-discovers it — no manual route registration
4. For a new tab, add a `<Tabs.Screen>` entry in `app/(tabs)/_layout.tsx`

## Drawer Navigation

The app uses a drawer (hamburger) menu wrapping the bottom tabs. The drawer contains:
- **Profile** — account info (editable, not wired to backend)
- **Activity** — hub for Messages, Transactions, Security History
- **Settings** — appearance, notifications, language picker
- **Logout** — placeholder (no auth system yet)

The header bar appears on all screens:
- **Left:** Hamburger menu icon
- **Right:** Profile icon (shortcut to Profile screen)

### Adding a Drawer Screen

1. Create `app/(drawer)/new-screen.tsx`
2. Add a `<Drawer.Screen>` entry in `app/(drawer)/_layout.tsx`
3. Add i18n strings to `constants/locales/en.ts`
4. Add icon mapping to `components/ui/icon-symbol.tsx` if using a new icon

## Adding a New Theme Token

1. Add the token to `constants/theme.ts` (in the appropriate section)
2. Import and use it in your component: `import { Colors, Spacing } from '@/constants/theme'`
3. Never use raw values — always reference the theme

## Adding a New Language

1. Create `constants/locales/<lang>.ts` — copy `en.ts` and translate the values
2. Import and register in `constants/i18n.ts`: `const i18n = new I18n({ en, es })`
3. Done — devices set to that language will use it automatically
4. Missing keys fall back to English — partial translations are safe to ship

## Adding a New Translatable String

1. Add the key and English value to `constants/locales/en.ts` in the appropriate namespace
2. Use `i18n.t('namespace.key')` in your component
3. Add translations to other locale files (optional — English fallback is automatic)

## Architecture Decisions

Recorded in `docs/adr/`. To add a new ADR:

1. Create `docs/adr/NNNN-short-title.md` (increment the number)
2. Include: Status, Date, Context, Decision, Consequences
3. Commit with the related code change

## Quality Gates (Current and Planned)

The following checks form the quality pipeline. Items marked *planned* will be added as tooling is integrated.

| Gate | Command | Status |
|------|---------|--------|
| Type checking | `npx tsc --noEmit` | Active |
| Linting | `npx expo lint` | Active |
| Secret scanning | `gitleaks detect --source . --verbose` | Active |
| Dependency audit (production) | `npm audit --omit=dev` | Active |
| Changelog generation | `npm run changelog` | Active |
| SAST security scanning | *TBD* | Planned |
| SBOM generation | *TBD* | Planned |
| Virus / malware scanning | *TBD* | Planned |
| Dependency updates | *TBD (e.g., Dependabot, Renovate)* | Planned |
| Unit tests | *TBD (e.g., Jest + React Native Testing Library)* | Planned |
| E2E tests | *TBD (e.g., Detox, Maestro)* | Planned |

All active gates must pass before committing. Planned gates will be enforced as they are added.

## Troubleshooting

**Metro bundler stuck:** `npx expo start --clear` (clears cache)

**Type errors after pulling:** `npm install` then `npx tsc --noEmit`

**Build fails on EAS:** Check the build logs at https://expo.dev — most issues are dependency or signing related.

**iOS signing issues:** Run `npx eas-cli credentials` to manage certificates and provisioning profiles.

**Worktree issues:** `git worktree list` to see all worktrees. `git worktree prune` to clean up stale entries.

**`packageManager` field after local build:** EAS local builds (`npx eas-cli build --local`) add a `"packageManager": "pnpm@..."` field to `package.json`. This project uses npm — discard the change before committing: `git restore package.json`
