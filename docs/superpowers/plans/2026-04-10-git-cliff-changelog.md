# Git-Cliff Changelog Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace manual CHANGELOG.md editing with git-cliff, preserving existing hand-written history and generating entries going forward from v0.6.0.

**Architecture:** Install git-cliff as a dev dependency, configure via `cliff.toml` at project root with Keep a Changelog template and conventional commit parsing, expose two npm scripts (`changelog` and `release`), and update all project docs to reflect the new workflow.

**Tech Stack:** git-cliff (npm package), TOML config, conventional commits

---

### Task 1: Create the v0.6.0 git tag

No tags exist yet. git-cliff needs tags for version boundaries.

**Files:**
- None (git operation only)

- [ ] **Step 1: Tag the v0.6.0 release commit**

```bash
git tag v0.6.0 e3b40e1
```

This tags the commit that bumped to v0.6.0 (`feat(ui): add screen rotation support and bump to v0.6.0`).

- [ ] **Step 2: Verify the tag**

```bash
git tag --list
```

Expected: `v0.6.0`

- [ ] **Step 3: Push the tag**

```bash
git push origin v0.6.0
```

---

### Task 2: Install git-cliff

**Files:**
- Modify: `package.json` (devDependencies)

- [ ] **Step 1: Install git-cliff as a dev dependency**

```bash
npm install git-cliff --save-dev
```

- [ ] **Step 2: Verify installation**

```bash
npx git-cliff --version
```

Expected: A version string like `git-cliff 2.x.x`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add git-cliff as dev dependency for changelog automation"
```

---

### Task 3: Create cliff.toml configuration

**Files:**
- Create: `cliff.toml`

- [ ] **Step 1: Create `cliff.toml` at project root**

```toml
[changelog]
header = """# Changelog\n
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n
"""
body = """
{%- if version %}
## [{{ version | trim_start_matches(pat="v") }}] - {{ timestamp | date(format="%Y-%m-%d") }}
{%- else %}
## [Unreleased]
{%- endif %}
{% for group, commits in commits | group_by(attribute="group") %}
### {{ group | upper_first }}
{% for commit in commits %}
- {{ commit.message | split(pat="\n") | first | upper_first | trim }}
{%- endfor %}
{% endfor %}
"""
trim = true

[git]
conventional_commits = true
filter_unconventional = true
split_commits = false
tag_pattern = "v[0-9].*"
sort_commits = "newest"

commit_parsers = [
    { message = "^feat", group = "Added" },
    { message = "^fix", group = "Fixed" },
    { message = "^perf", group = "Changed" },
    { message = "^refactor", group = "Changed" },
    { message = "^security", group = "Security" },
    { message = "^deprecate", group = "Deprecated" },
    { message = "^docs", skip = true },
    { message = "^style", skip = true },
    { message = "^test", skip = true },
    { message = "^build", skip = true },
    { message = "^ci", skip = true },
    { message = "^chore", skip = true },
]
```

- [ ] **Step 2: Test the config with a dry run**

```bash
npx git-cliff --unreleased --config cliff.toml
```

Expected: Output showing an `## [Unreleased]` section with commits since `v0.6.0` (the `fix(nav)` and `fix(activity)` commits should appear under `### Fixed`). The `docs:` spec commit should be skipped.

- [ ] **Step 3: Commit**

```bash
git add cliff.toml
git commit -m "build: add git-cliff configuration for Keep a Changelog format"
```

---

### Task 4: Add npm scripts

**Files:**
- Modify: `package.json` (scripts section)

- [ ] **Step 1: Add the `changelog` and `release` scripts to `package.json`**

In the `"scripts"` section of `package.json`, add these two entries:

```json
"changelog": "git-cliff --unreleased --prepend CHANGELOG.md",
"release": "git-cliff --prepend CHANGELOG.md --tag"
```

The `release` script is invoked as `npm run release -- vX.Y.Z` — the version argument is passed through to `--tag`.

- [ ] **Step 2: Test `npm run changelog`**

```bash
npm run changelog
```

Then inspect the top of `CHANGELOG.md`. Expected: an `## [Unreleased]` section with the `fix(nav)` and `fix(activity)` commits under `### Fixed`. All existing hand-written content below should be untouched.

- [ ] **Step 3: Verify the changelog looks correct**

```bash
head -30 CHANGELOG.md
```

Expected: The Keep a Changelog header, then `## [Unreleased]` with the recent fix commits, then `## [0.6.0] - 2026-04-10` with the existing hand-written content.

- [ ] **Step 4: Commit**

```bash
git add package.json CHANGELOG.md
git commit -m "build: add changelog and release npm scripts for git-cliff"
```

---

### Task 5: Write ADR-0012

**Files:**
- Create: `docs/adr/0012-git-cliff-changelog.md`

- [ ] **Step 1: Create `docs/adr/0012-git-cliff-changelog.md`**

```markdown
# ADR-0012: Automated Changelog with git-cliff

**Status:** Accepted
**Date:** 2026-04-10

## Context

The project follows Keep a Changelog and Conventional Commits. Maintaining the changelog manually after each commit is error-prone and tedious. The backlog identified automated changelog generation as a desired improvement.

## Decision

Adopt git-cliff to generate changelog entries from conventional commits. Configuration lives in `cliff.toml` at the project root. Two npm scripts provide the interface:

- `npm run changelog` — regenerates the `[Unreleased]` section from commits since the latest tag
- `npm run release -- vX.Y.Z` — converts unreleased entries into a versioned section

Existing hand-written changelog entries (v0.1.0–v0.6.0) are preserved. git-cliff only generates entries for commits after the `v0.6.0` tag.

Commit types map to Keep a Changelog categories: feat→Added, fix→Fixed, perf/refactor→Changed, security→Security, deprecate→Deprecated. Types docs, style, test, build, ci, and chore are omitted from the changelog.

## Consequences

- No more manual changelog writing — `npm run changelog` generates it from commits
- Commit message quality matters more — messages appear directly in the changelog
- Version bumps still require manual updates to app.json and package.json
- The `release` script handles changelog versioning but does not automate tagging or publishing
- New dev dependency: `git-cliff` (npm package, Rust binary)
```

- [ ] **Step 2: Commit**

```bash
git add docs/adr/0012-git-cliff-changelog.md
git commit -m "docs(adr): record adoption of git-cliff for changelog automation"
```

---

### Task 6: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Update the "Commit Messages" section**

In `AGENTS.md`, find the line:

```
After committing, update `CHANGELOG.md` under `## [Unreleased]` using Keep a Changelog categories: Added, Changed, Deprecated, Removed, Fixed, Security.
```

Replace it with:

```
After committing, run `npm run changelog` to auto-generate the `[Unreleased]` section from conventional commits via git-cliff.
```

- [ ] **Step 2: Update the "Versioning" section's bump checklist**

In `AGENTS.md`, find the line:

```
- `CHANGELOG.md` → move Unreleased entries to versioned section
```

Replace it with:

```
- Run `npm run release -- vX.Y.Z` to generate the versioned changelog section
```

- [ ] **Step 3: Update the "Architecture Decisions" section**

In `AGENTS.md`, after the line:

```
- 0011: Screen rotation responsiveness
```

Add:

```
- 0012: Automated changelog with git-cliff
```

- [ ] **Step 4: Remove from backlog**

In `AGENTS.md`, delete this line from the backlog:

```
- Automated changelog generation with [git-cliff](https://git-cliff.org/) from conventional commits
```

- [ ] **Step 5: Update Build and Test Commands section**

In the `## Build and Test Commands` code block in `AGENTS.md`, add after the `# Lint` entry:

```bash
# Generate changelog (unreleased entries)
npm run changelog

# Generate changelog for a release
npm run release -- vX.Y.Z
```

- [ ] **Step 6: Commit**

```bash
git add AGENTS.md
git commit -m "docs: update AGENTS.md for git-cliff changelog workflow"
```

---

### Task 7: Update DEVELOPER_GUIDE.md

**Files:**
- Modify: `docs/DEVELOPER_GUIDE.md`

- [ ] **Step 1: Replace the "5. Update the Changelog" section**

In `docs/DEVELOPER_GUIDE.md`, find the entire section `### 5. Update the Changelog` (lines 123–138). Replace it with:

```markdown
### 5. Update the Changelog

After committing, regenerate the changelog:

```bash
npm run changelog
```

This runs git-cliff to auto-generate the `## [Unreleased]` section from your conventional commits. Only `feat`, `fix`, `perf`, `refactor`, `security`, and `deprecate` commits appear — others (docs, style, test, build, ci, chore) are omitted.

The existing hand-written changelog entries are preserved. git-cliff only modifies the `[Unreleased]` section.

**At release time**, convert unreleased entries to a versioned section:

```bash
npm run release -- vX.Y.Z
```

This replaces the `[Unreleased]` heading with `[X.Y.Z] - YYYY-MM-DD`. You still need to manually bump version numbers in `app.json` (x3) and `package.json`.
```

- [ ] **Step 2: Update the "Versioning > Bumping the Version" section**

In `docs/DEVELOPER_GUIDE.md`, find the line:

```
Also update `CHANGELOG.md`: move `## [Unreleased]` entries to a new versioned section.
```

Replace it with:

```
Also run `npm run release -- vX.Y.Z` to generate the versioned changelog section.
```

- [ ] **Step 3: Add git-cliff to the Quality Gates table**

In the Quality Gates table in `docs/DEVELOPER_GUIDE.md`, add a new row after the "Dependency audit" row:

```
| Changelog generation | `npm run changelog` | Active |
```

- [ ] **Step 4: Add git-cliff to Prerequisites**

In the Prerequisites section at the top of `docs/DEVELOPER_GUIDE.md`, add to the list (no action needed from devs since it installs via npm):

```
- **git-cliff** — changelog generation (installed automatically via `npm install`)
```

- [ ] **Step 5: Commit**

```bash
git add docs/DEVELOPER_GUIDE.md
git commit -m "docs: update developer guide for git-cliff changelog workflow"
```

---

### Task 8: Verify end-to-end

- [ ] **Step 1: Run `npm run changelog` and inspect the output**

```bash
npm run changelog
head -40 CHANGELOG.md
```

Expected: `## [Unreleased]` section with all non-skipped commits since `v0.6.0`, followed by the existing `## [0.6.0]` hand-written section and all earlier versions.

- [ ] **Step 2: Verify the changelog format matches Keep a Changelog**

Check that:
- Header says "All notable changes..." (may be duplicated if git-cliff regenerated it — if so, remove the duplicate header in the next step)
- Categories are capitalized correctly (Added, Fixed, Changed, etc.)
- Entries are bullet points with the commit message

- [ ] **Step 3: Fix any formatting issues**

If the header is duplicated (git-cliff's header + the existing one), edit `cliff.toml` to set `header = ""` since the existing CHANGELOG.md already has the correct header. Then re-run `npm run changelog`.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verify git-cliff changelog generation end-to-end"
```

- [ ] **Step 5: Push**

```bash
git push
```
