# ADR-0010: Drawer Navigation with Header Bar

**Status:** Accepted
**Date:** 2026-04-10

## Context

The app has bottom tab navigation (Home, About) but no way to access account-level features like profile, settings, or activity history. Users expect a hamburger menu for secondary navigation and a profile shortcut in the upper-right corner of the header bar. This is a standard mobile app pattern.

## Decision

Add a **drawer navigator** (hamburger menu) wrapping the existing tab navigator, plus a **header bar** with a profile icon shortcut. Use Expo Router's built-in `Drawer` component (wraps `@react-navigation/drawer`).

### Navigation Architecture

```
Stack (Root _layout.tsx)
  ├── Drawer (drawer/_layout.tsx)
  │     ├── Tabs (tabs/_layout.tsx) — Home, About
  │     ├── Profile — account info (editable, not wired to backend)
  │     ├── Activity — hub for Messages, Transactions, Security History
  │     └── Settings — appearance, notifications, language
  └── Modal (overlay)
```

### File Structure

```
app/
  _layout.tsx                  # Root (ThemeProvider + Stack) — existing
  modal.tsx                    # Modal screen — existing
  (drawer)/
    _layout.tsx                # Drawer navigator — NEW
    profile.tsx                # Profile screen — NEW
    activity.tsx               # Activity hub — NEW
    settings.tsx               # Settings screen — NEW
    (tabs)/
      _layout.tsx              # Tab navigator — existing, moved
      index.tsx                # Home tab — existing, moved
      about.tsx                # About tab — existing, moved
```

### Header Bar

- **Left:** Hamburger icon (opens drawer)
- **Center:** Screen title
- **Right:** Profile icon (navigates directly to Profile screen). Future items (e.g., shopping cart) slot in to the left of the profile icon.

### Drawer Items (in order)

| Item | Icon (SF Symbol) | Icon (Material) | Behavior |
|------|-----------------|-----------------|----------|
| Profile | `person.circle.fill` | `account-circle` | Opens Profile screen |
| Activity | `clock.arrow.circlepath` | `history` | Opens Activity hub |
| Settings | `gearshape.fill` | `settings` | Opens Settings screen |
| _(separator)_ | | | |
| Logout | `rectangle.portrait.and.arrow.right` | `logout` | Does nothing (placeholder) |

### Profile Screen

- **Avatar** — placeholder person icon
- **Member ID** — read-only, placeholder value (e.g., `MBR-000-000-001`)
- **Display Name** — editable text input (not wired to backend)
- **Email** — editable text input (not wired to backend)
- **Phone** — editable text input (not wired to backend)

Accessible via drawer item OR profile icon in header bar.

### Activity Screen

Hub screen with three navigation cards:

| Item | Icon (SF Symbol) | Icon (Material) | Subtitle |
|------|-----------------|-----------------|----------|
| Messages | `bubble.left.fill` | `chat` | Inbox and notifications |
| Transactions | `creditcard.fill` | `credit-card` | Order and payment history |
| Security History | `lock.shield.fill` | `security` | Login activity and alerts |

Each card navigates to a placeholder list screen (not wired to backend).

### Settings Screen

Three sections:

1. **Appearance** — Dark mode toggle (functional, uses device color scheme)
2. **Notifications** — Push notifications toggle, Email notifications toggle (not wired)
3. **Language** — Picker with "Device Default" option + available languages. Overrides the `i18n.locale` from ADR-0009. Selecting "Device Default" unsets the override and reverts to device language detection.

### Language Override Integration

The language picker extends the i18n system from ADR-0009:
- Language preference stored locally via AsyncStorage
- On app start, check for stored preference before falling back to `getLocales()`
- "Device Default" clears the stored preference
- No new dependencies beyond `@react-native-async-storage/async-storage`

## Consequences

- Drawer provides a natural home for account and settings features
- Header bar follows platform conventions (hamburger left, actions right)
- Profile accessible two ways: drawer item and header shortcut
- All new screens are interactive but not wired to a backend — patterns are in place
- Future items (shopping cart, notifications badge) slot into the header bar
- File structure reorganization moves `(tabs)/` inside `(drawer)/` — one-time migration
- New dependency: `@react-navigation/drawer` (and its peer `react-native-gesture-handler`, already installed)
- New dependency: `@react-native-async-storage/async-storage` (for language preference)

### Backlog Items (Do Not Implement)

- Backend wiring for Profile edits
- Backend wiring for notification preferences
- Push notification integration
- Messages, Transactions, Security History real data
- Shopping cart icon in header
- Logout with actual auth flow
