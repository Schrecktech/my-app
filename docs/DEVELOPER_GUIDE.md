# Developer Guide

Development cycle for this Expo cross-platform app (iOS, Android, Web).

## Prerequisites

- **Node.js** LTS (v20+)
- **npm** (comes with Node)
- **EAS CLI** — `npm install -g eas-cli`
- **Expo Go** app on your phone (for quick device testing)

Optional (for local simulators):
- **Xcode** — iOS simulator (macOS only)
- **Android Studio** — Android emulator

## First-Time Setup

```bash
# Clone the repo (or navigate to project root)
cd my-app

# Install dependencies
npm install

# Log in to Expo (needed for EAS builds)
eas login
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

### 4. Commit

Follow conventional commit style. Include what changed and why.

```bash
git add <files>
git commit -m "Short description of change"
```

### 5. Build for Devices

#### iOS (Cloud Build — works from any OS)

```bash
eas build --platform ios --profile preview
```

- **preview** — internal distribution, installs via QR/link
- **production** — App Store ready

The build runs in Expo's cloud. When done, you get a download link. On iPhone, open the link in Safari to install.

#### Android (Cloud Build)

```bash
eas build --platform android --profile preview
```

Download the `.apk` and install on your device.

#### Web

```bash
npx expo export --platform web
```

Outputs static files to `dist/` for deployment to any web host.

### 6. Over-the-Air Updates (JS-only changes)

For changes that don't touch native code:

```bash
eas update --branch preview --message "Description of update"
```

Users get the update without downloading a new build.

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

## Adding a New Theme Token

1. Add the token to `constants/theme.ts` (in the appropriate section)
2. Import and use it in your component: `import { Colors, Spacing } from '@/constants/theme'`
3. Never use raw values — always reference the theme

## Architecture Decisions

Recorded in `docs/adr/`. To add a new ADR:

1. Create `docs/adr/NNNN-short-title.md` (increment the number)
2. Include: Status, Date, Context, Decision, Consequences
3. Commit with the related code change

## Troubleshooting

**Metro bundler stuck:** `npx expo start --clear` (clears cache)

**Type errors after pulling:** `npm install` then `npx tsc --noEmit`

**Build fails on EAS:** Check the build logs at https://expo.dev — most issues are dependency or signing related.

**iOS signing issues:** Run `eas credentials` to manage certificates and provisioning profiles.
