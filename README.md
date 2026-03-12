# Bookmark Manager PWA

A fast, offline-capable PWA to explore and manage a curated collection of 1000+ web bookmarks. Built with React, TypeScript, TailwindCSS, and Zustand.

**Deploy** → https://webresources.netlify.app

## Features

- **Fuzzy search** — search across titles, descriptions, tags, URLs, and categories with Fuse.js
- **Comunidad view** — dedicated sidebar nav entry that shows all curated resources from `resources.json`
- **Your Resources view** — dedicated "Tus Recursos" section showing only user-created resources stored in `localStorage`
- **Favorites** — mark resources as favorites, persisted in localStorage
- **Status tracking** — cycle through states: Pendiente → Consumido → Referencia
- **Category filtering** — browse resources by category via sidebar navigation
- **Dark mode** — toggle between light and dark themes
- **Responsive design** — sidebar converts to a slide-in overlay on mobile; hamburger menu in topbar; optimized touch targets throughout
- **PWA** — installable, works offline with service worker
- **Virtualization-ready** — designed to handle thousands of resources

## Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript (strict) |
| Build | Vite 7 |
| Styling | TailwindCSS 4 |
| State | Zustand |
| Search | Fuse.js |
| Routing | React Router v7 |
| PWA | vite-plugin-pwa |
| Testing | Vitest + React Testing Library |
| Package manager | pnpm |

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check + bundle |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once |
| `pnpm test:coverage` | Generate coverage report |
| `pnpm test:ui` | Open Vitest UI |

## Project structure

```
src/
├── app/              # App.tsx (main application shell + sidebar toggle state)
├── components/       # UI components (ResourceCard, SearchBar, Sidebar, Topbar, TagList, CategoryList)
├── hooks/            # Custom hooks (useResources, useFavorites, useStatuses, useSearch)
├── pages/            # Pages (Dashboard, NotFound)
├── services/         # Business logic (storageService, searchService, resourceService)
├── store/            # Zustand store (resourceStore)
├── types/            # TypeScript types (Resource, ResourceStatus, UserState)
├── utils/            # Utility functions (url, date)
├── data/             # resources.json (read-only source of truth)
└── test/             # Test setup and utilities

docs/
└── business_context.md   # Non-technical business context (Spanish)
```

## Architecture

- **SOLID** — each component, hook, and service has a single responsibility
- **Service layer** — `storageService` (localStorage), `searchService` (Fuse.js), `resourceService` (JSON data)
- **Zustand store** — global state for resources, favorites, statuses, search, and filters
- **Custom hooks** — `useResources`, `useFavorites`, `useStatuses`, `useSearch`
- **Path aliases** — `@components`, `@hooks`, `@store`, `@services`, `@types`, `@utils`

## Data model

Resources are stored in `src/data/resources.json` (read-only):

```ts
interface Resource {
  id: string
  title: string
  url: string
  description?: string
  category: string
  tags: string[]
  createdAt: string
}
```

User state (favorites, statuses) is persisted in `localStorage`:

```ts
type ResourceStatus = "pending" | "consumed" | "reference"
```

## Testing

49 unit tests with [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/):

- **Services** — storageService, searchService
- **Hooks** — useFavorites, useStatuses
- **Components** — ResourceCard, SearchBar

| Command | Description |
|---|---|
| `pnpm test:run` | Run all tests once |
| `pnpm test:coverage` | Run with v8 coverage report |

## CI

GitHub Actions runs on every push and on PRs targeting `main` or `develop`:

```
Type check (tsc) → Unit tests (vitest) → Build (vite)
```

## Branch strategy

| Branch | Rule |
|---|---|
| `main` | PR only — production |
| `develop` | PR only — integration |

Naming: `feat/`, `fix/`, `chore/`, `refactor/`, `test/`, `style/`, `docs/`

## Changelog

See [CHANGELOG.txt](./CHANGELOG.txt)
