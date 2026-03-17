# Bookmark Manager PWA

A fast, offline-capable PWA to explore and manage a curated collection of 1000+ web bookmarks. Built with React, TypeScript, TailwindCSS, and Zustand.

**Deploy** → https://webresources.netlify.app

## Features

- **Fuzzy search** — search across titles, descriptions, tags, URLs, and categories with Fuse.js
- **Comunidad view** — dedicated sidebar nav entry that shows all curated resources from `resources.json`
- **Your Resources view** — dedicated "Tus Recursos" section showing only user-created resources stored in `localStorage`
- **Personal resource CRUD** — create, edit, and delete personal resources via a modal form (title, URL, description, category, tags); changes persist in `localStorage`
- **YouTube video support** — YouTube URLs auto-detected; ResourceCard shows thumbnail with play overlay; embedded player via `youtube-nocookie.com` modal
- **YouTube section** — resources with YouTube URLs are grouped in a dedicated collapsible **"Videos de YouTube"** section, visually separated from regular resources in every view; a **Videos** sidebar filter shows only YouTube resources across community and personal collections
- **Language support** — switch between Spanish and English at any time using the ES/EN button in the top bar; your preference is remembered across sessions and the app auto-detects your browser language on first visit
- **Backup & restore** — export all personal resources, favorites and statuses to a JSON file; import back with URL-conflict detection and per-resource update/skip controls; export/import buttons live in the "Tus Recursos" header (export only shown when resources exist)
- **Cross-filter user resources** — personal resources appear in Favoritos, Pendientes, Consumidos, and Categoría filters alongside community resources
- **localStorage notice** — friendly reminder in "Tus Recursos" to download a backup before clearing browser data
- **Ant Design icons** — all UI icons use `@ant-design/icons` SVG components
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
| Icons | @ant-design/icons |
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
├── components/       # UI components (ResourceCard, SearchBar, Sidebar, Topbar, modals, etc.)
├── constants/        # Centralized constants (storageKeys)
├── hooks/            # Custom hooks (useResources, useFavorites, useStatuses, useSearch, useUserResources)
├── locales/          # i18n translations (en, es)
├── pages/            # Pages (Dashboard, NotFound)
├── services/         # Business logic (storageService, searchService, resourceService, backupService, userResourceService)
├── store/            # Zustand store (resourceStore)
├── types/            # TypeScript types (Resource, UserResource, ResourceStatus)
├── utils/            # Utility functions (url, youtube)
├── data/             # resources.json (read-only source of truth)
└── test/             # Test setup and utilities

docs/
└── business_context.md   # Non-technical business context (Spanish)
```

## Architecture

- **SOLID** — each component, hook, and service has a single responsibility
- **DRY** — centralized storage keys, consolidated filter logic, shared service layer
- **Functional patterns** — immutable state updates, pure service functions, no side effects in hooks
- **Service layer** — `storageService` (localStorage), `searchService` (Fuse.js), `resourceService` (JSON data), `userResourceService` (CRUD), `backupService` (export/import)
- **Zustand store** — global state for resources, favorites, statuses, search, filters, and user resources with `getFilteredResources()` selector
- **Custom hooks** — `useResources`, `useFavorites`, `useStatuses`, `useSearch`, `useUserResources`
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

234+ unit tests with [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/):

- **Services** — storageService, searchService, resourceService, userResourceService, backupService
- **Hooks** — useFavorites, useStatuses, useResources, useUserResources
- **Components** — ResourceCard, SearchBar, Sidebar, Topbar, ImportResourcesModal, ResourceFormModal, ConflictResolutionDialog, DeleteConfirmModal, YouTubePlayerModal, YouTubeSection, LanguageSelector
- **Store** — resourceStore (initialize, filters, CRUD, search)
- **Pages** — Dashboard, NotFound
- **App** — App shell (routing, sidebar toggle, import/export, create flow)
- **Utils** — url, youtube

Coverage: ~99% statements, ~95% branches, ~99% functions, ~99% lines.

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
