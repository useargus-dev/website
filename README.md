# Argus marketing site

Vite + React site for [useargus.dev](https://useargus.dev).

## Develop

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

`prebuild` runs `scripts/fetch-ecosystem-stats.mjs`, which pulls GitHub release, npm, and PyPI download stats into `src/generated/ecosystem-stats.json`. The homepage also tries a live refresh in the browser on load.

## Deploy on Vercel

1. Import the `website` repo (or set **Root Directory** = `website` in a monorepo).
2. Build command: `pnpm run build`
3. Output directory: `dist`

Stats refresh whenever you redeploy — `prebuild` fetches the latest numbers before each build.
