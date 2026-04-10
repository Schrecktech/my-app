# ADR-0008: Use EAS for Build and Deployment

**Status:** Accepted
**Date:** 2026-04-09

## Context

Building iOS apps normally requires a Mac with Xcode. Development happens on both Linux (cloud dev machines) and macOS (local). We need a build and deployment pipeline that:

- Builds iOS from any OS (Linux, macOS, Windows)
- Builds locally on macOS for fast iteration
- Manages iOS code signing without manual certificate juggling
- Supports internal distribution (preview builds) and App Store submission
- Provides over-the-air (OTA) updates for JS-only changes

## Decision

Use **Expo Application Services (EAS)** for building, signing, and distributing the app. EAS CLI is invoked via `npx eas-cli` (no local or global install). The minimum CLI version is enforced by the `cli.version` field in `eas.json`.

### Build Profiles (eas.json)

| Profile | Purpose | Distribution |
|---------|---------|-------------|
| `development` | Dev client with hot reload | Internal (registered devices) |
| `preview` | Testing builds for stakeholders | Internal (install via link/QR) |
| `production` | App Store / Play Store submission | Store |

### Build Modes

- **Cloud build** (`npx eas-cli build --platform ios`) — runs on Expo's servers, works from any OS, ~10-15 min including queue time
- **Local build** (`npx eas-cli build --platform ios --local`) — runs on macOS with Xcode, ~2-5 min, no upload/queue

### Version Management

`"appVersionSource": "local"` in `eas.json` — build numbers come from `app.json` (iOS `buildNumber`, Android `versionCode`), not from an EAS remote counter. This keeps Xcode, the app, and the codebase in sync. See ADR-0005 for the full version bump checklist.

### Code Signing

EAS manages iOS provisioning profiles and certificates. On first build, it prompts to create or link credentials. Use `npx eas-cli credentials` to manage signing assets.

### Over-the-Air Updates

`npx eas-cli update` pushes JS bundle changes to users without a new native build. Only works for non-native changes (UI, logic, assets).

## Consequences

- iOS builds work from Linux and macOS — no Mac required for cloud builds
- Local macOS builds are significantly faster for development iteration
- Code signing complexity is abstracted by EAS credentials management
- OTA updates enable rapid hotfixes without app store review
- Free tier has build limits; heavy usage requires a paid Expo plan
- Cloud builds depend on Expo's infrastructure availability
- `cli.version` in `eas.json` enforces minimum CLI version across machines
- All commands use `npx eas-cli` — no global or local install required
