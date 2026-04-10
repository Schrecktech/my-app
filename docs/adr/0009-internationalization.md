# ADR-0009: Internationalization (i18n)

**Status:** Accepted
**Date:** 2026-04-10

## Context

The app has ~25 user-facing strings hardcoded in English across 4 screens. The `TAB_LABELS` pattern in `_layout.tsx` was designed with multilingual support in mind but never wired up. We need infrastructure to support any language, shipping English only for now, with the ability to add translations incrementally.

Requirements:
- Device language detection (no in-app picker)
- Fallback to English for missing translations
- Partial translations are safe to ship
- Type-safe translation keys
- Minimal setup and bundle size

## Decision

Use **`expo-localization`** for device language detection and **`i18n-js`** for string lookup with fallback.

### Why not alternatives?

- **`react-i18next`** — heavier (~40KB vs ~15KB), requires React providers/context, overkill without an in-app language picker
- **Roll our own** — would reimplement interpolation, pluralization, and fallback logic that `i18n-js` already provides

### File Structure

```
constants/
  i18n.ts              # i18n setup (locale detection, config)
  locales/
    en.ts              # English strings (only language shipped now)
```

Translation files are TypeScript objects — type-safe and auto-completable. No JSON parsing.

### Translation Key Structure

One flat namespace per screen, plus `common` and `tabs` for shared strings:

| Namespace | Scope |
|-----------|-------|
| `common` | Shared strings (app name) |
| `tabs` | Tab bar labels (Home, About) |
| `home` | Home screen content |
| `about` | About screen content |
| `modal` | Modal screen content |

Keys use camelCase: `home.welcomeTitle`, `about.hoursBody`, `tabs.home`.

Technical labels in the Build Info section (Build, Expo SDK, Platform) are not translated — they are developer-facing.

### Integration Pattern

```ts
// constants/i18n.ts
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './locales/en';

const i18n = new I18n({ en });
i18n.locale = getLocales()[0]?.languageCode ?? 'en';
i18n.enableFallback = true;

export default i18n;
```

Usage in components:

```tsx
import i18n from '@/constants/i18n';
<ThemedText type="title">{i18n.t('home.welcomeTitle')}</ThemedText>
```

No React providers or hooks required.

### Fallback Chain

With `enableFallback = true`:

1. Requested locale (e.g., `es`) — look for key in Spanish
2. Base language (`en`) — if missing, fall back to English
3. Key name itself — if missing everywhere, displays literal key (e.g., `home.welcomeTitle`)

Partial translations are safe. A missing string shows English, not a blank or crash.

### Adding a New Language

1. Create `constants/locales/<lang>.ts` with translated strings
2. Import and register in `i18n.ts`: `const i18n = new I18n({ en, es })`
3. Done — device set to that language picks it up automatically

## Consequences

- All user-facing strings are centralized in `constants/locales/` — no more hunting through components
- Type-safe keys prevent typos at compile time
- Adding a language is a single file + one import — no component changes needed
- Partial translations are safe to ship incrementally
- Device language only — no in-app picker complexity (can be added later via ADR if needed)
- Two new dependencies: `expo-localization`, `i18n-js`
