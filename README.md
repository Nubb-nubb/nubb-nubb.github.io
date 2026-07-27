# nubbnubb Portfolio Site

Personal portfolio/hobby site built with Vue 3, Vite, Vue Router, and Tailwind CSS.

## Tech Stack

- Vue 3
- Vite 5
- Vue Router 4
- Tailwind CSS 3 + PostCSS + Autoprefixer
- Prettier
- Husky + lint-staged
- GitHub Pages (GitHub Actions)

## Prerequisites

Install these on your machine:

- Node.js (recommended: 20.x LTS to match CI)
- npm (comes with Node.js)
- Git

Optional but useful:

- GitHub account and repository access (for deploys)
- GitHub CLI (`gh`) if you want to use the manual deploy script

## First-Time Setup

From the repository root:

```bash
npm install
```

This installs all dependencies and also sets up the Husky git hook via the `prepare` script.

## Daily Development Commands

Start local dev server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Format all files:

```bash
npm run format
```

Check formatting only:

```bash
npm run format:check
```

## Git Setup in This Repo

After `npm install`, pre-commit checks are active through Husky.

- Hook location: `.husky/pre-commit`
- Current hook command: `npx lint-staged`
- lint-staged config lives in `package.json`

What happens on commit:

- Staged `js/vue/css/html/json/md` files are auto-formatted with Prettier.

## Deployment

### Recommended (Automatic)

Deployment to GitHub Pages is handled by GitHub Actions:

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger: push to `main` (and manual workflow dispatch)
- Build command in CI: `npm run build`
- Artifact deployed: `dist/`

### Optional (Manual)

A manual script is available:

```bash
npm run deploy
```

This uses `gh-pages` and publishes `dist/` directly.

## Project Architecture

### Root Config Files

- `vite.config.js`: Vite config and dynamic `base` path for GitHub Pages
- `tailwind.config.js`: design tokens (colors/fonts) and Tailwind scanning paths
- `postcss.config.js`: Tailwind + Autoprefixer
- `package.json`: scripts, dependencies, lint-staged
- `index.html`: Vite app shell

### Source Tree

```text
src/
  App.vue                # global layout + top navigation + RouterView
  main.js                # app bootstrap
  style.css              # global styles / utility layers
  router/
    index.js             # route definitions
  views/                 # page-level views
    hobbies/             # hobby tab subviews used by ProjectsView
  components/            # reusable UI components
  composables/           # shared logic/state utilities
```

### Route Map

Defined in `src/router/index.js`:

- `/` -> `HomeView`
- `/about` -> `AboutView`
- `/projects` -> `ProjectsView`
- `/workshop` -> `WorkshopView`
- `/shorts` -> `ShortsView`
- `/setups` redirects to `/projects`

Notes:

- Router uses hash history (`createWebHashHistory`) for GitHub Pages compatibility.

### Reusable UI Components

Main reusable components live in `src/components/`.

Important shared pieces include:

- `TabNavigation.vue`, `PillTabs.vue`
- `ImagePreviewModal.vue`
- `VideoThumbnail.vue`
- `CollapsibleSection.vue` and `CollapsibleControls.vue`
- `AlbumGrid.vue`, `ProcessTimeline.vue`, `SetupEntry.vue`, `WorkshopCard.vue`
- `AppFooter.vue`

### Shared Composables

Shared logic lives in `src/composables/`:

- `useImagePreview.js`: preview modal state + escape handling
- `useMediaUtils.js`: media path and type helpers
- `useCarousel.js`: carousel behavior
- `useRandomTitles.js`: shared randomized title state

## Content and Media Locations

- Static media lives in `public/images/`
- Nested hobby media folders include:
  - `public/images/3dprint stuff/`
  - `public/images/blacksmith_15/`

When adding new media:

- Use paths under `public/images/`.
- If adding a new video to the site, also add it to `allVideos` in `src/views/ShortsView.vue` so it appears in the shorts feed.

## Styling System

- Tailwind is configured in `tailwind.config.js`
- Custom color tokens and font families are in `theme.extend`
- Global project styles are in `src/style.css`

## Troubleshooting

If install fails:

1. Check Node version: `node -v`
2. Remove `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

If dev server fails to start:

- Confirm port `5173` is available.
- Override port if needed: `npm run dev -- --port 5174`

If formatting hooks do not run:

- Reinstall deps: `npm install`
- Ensure Husky exists: `.husky/pre-commit`

## Security / Maintenance Notes

Current dependency audit reports vulnerabilities in transitive packages. To review:

```bash
npm audit
```

Apply fixes cautiously:

```bash
npm audit fix
```

Use `npm audit fix --force` only after checking for breaking changes.
