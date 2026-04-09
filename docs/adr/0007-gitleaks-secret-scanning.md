# ADR-0007: Use Gitleaks for Secret Scanning

**Status:** Accepted
**Date:** 2026-04-09

## Context

The repository is public on GitHub (Schrecktech/my-app). Accidentally committed secrets (API keys, tokens, passwords) become immediately exposed and are cached by bots within seconds. Prevention is far cheaper than remediation (rotating keys, revoking tokens, auditing access).

## Decision

Use [gitleaks](https://github.com/gitleaks/gitleaks) as a required quality gate before pushing. Gitleaks scans the full git history for patterns matching known secret formats (API keys, tokens, passwords, private keys).

Command: `gitleaks detect --source . --verbose`

This runs against all commits, not just staged changes, catching secrets that may have been committed and then "removed" (still in git history).

## Consequences

- Secrets are caught before they reach the remote
- Scans the full commit history, not just the working tree
- Low false-positive rate with gitleaks' curated rule set
- Must be installed on every development machine (`brew install gitleaks`)
- Does not replace proper secret management (EAS environment variables, `.env*.local` in `.gitignore`) — it's a safety net
- Future: can be added as a pre-push git hook or CI step for automated enforcement
