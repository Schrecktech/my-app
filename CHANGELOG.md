# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add automated release script with version detection

### Changed

- Simplify changelog to full regeneration with --output

### Fixed

- Make changelog script idempotent with wrapper script
- Adjust cliff.toml header to match existing CHANGELOG.md format
- Add i18n titles and icons to activity sub-screen headers
- Change activity back button label from 'index' to 'return'

## [0.6.0] - 2026-04-10

### Added

- Add screen rotation support and bump to v0.6.0
- Load language preference on app startup
- Add settings screen with appearance, notifications, and language picker
- Add activity hub with messages, transactions, and security sub-screens
- Add profile screen with editable fields and member ID
- Restructure routes with drawer wrapping tabs
- Add icon mappings for drawer, profile, activity, and settings
- Add strings for drawer, profile, activity, and settings screens
- Scale parallax header height with system font size
- Apply maxFontSizeMultiplier globally via ThemedText
- Add Accessibility tokens with maxFontSizeMultiplier
- Add debug info modal and bump to v0.3.0
- Wire Modal screen strings to i18n
- Wire About screen strings to i18n
- Wire Home screen strings to i18n
- Wire tab labels to i18n
- Add i18n setup with locale detection and fallback
- Add English locale file with all user-facing strings
- Dynamic build ID from git commit hash and artifact output to build/
- Add build info section for deployment verification

### Changed

- Rename explore.tsx to about.tsx and add i18n ADR

### Fixed

- Add back button to drawer screens and hide redundant activity header
- Resolve duplicate activity screen by moving hub to activity/index.tsx
- Switch to local version source so build number matches app version
- Add lineHeight to version text for scaled text
- Allow row wrapping at large text sizes
- Center-align hero text for scaled text wrapping
- Translate header title via i18n
- Simplify to version, build ID, and key platform info
- Use router.back() for dismiss and redesign layout
- Add web icon mapping and reduce header height
- Replace npx eas with npx eas-cli to avoid namesquatting risk
- Use full ISO date
- Remove duplicate npx prefix in build command
- Resolve hero title text clipping with explicit lineHeight
- Pin eas-cli version and add production dependency audit
