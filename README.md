# Placard website

Independent AstroWind marketing site and public documentation for https://placard.fyi.

Requires Node 24 and pnpm 12.4.1. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, `pnpm build`, and `node scripts/check-output.mjs`. Preview with `pnpm preview`.

## Content

Marketing content lives in Astro pages. Technical docs remain in placard-app/core. `pnpm sync:docs` imports the curated catalog from core main, records the commit and rewrites links. Review claims against the shipped release before merging. It requires GitHub CLI authentication; ordinary builds do not. Daily automation opens or updates the `automated/core-docs` PR. The organization must allow GitHub Actions to create pull requests.

`pnpm sync:installers` mirrors only verified stable release installers from placard-app/core. Deployment refreshes these independently of docs and stops on incomplete assets or integrity mismatches. Daily scheduled deployment refreshes installers; manual workflow dispatch refreshes them sooner.

## Deployment and rollback

GitHub Pages uses `.github/workflows/deploy.yml`; production origin is https://placard.fyi with base `/`. Pull requests build without publishing. Enable Pages with GitHub Actions as its source. DNS remains pointed at placard-app.github.io.

Before cutover, retain core commit f2adeba78fbc17204569258044034eb8c0120840 and its Pages deployment. Disable core's Pages workflow, clear its custom domain, assign placard.fyi to this repository, deploy and verify HTTPS, all docs routes and installer bytes. Only then remove core's old site and build references.

Rollback: clear this repository's custom domain, assign placard.fyi back to core, re-enable core's Pages workflow, and dispatch it at the retained revision (restore the old site commit if cleanup was merged). Do not delete the old deployment until the migration is confirmed.

## Licenses

AstroWind retains its MIT license in LICENSE.md; provenance is in UPSTREAM.md. Reused Placard content and assets are AGPL-3.0-only, with the license in LICENSE-PLACARD.
