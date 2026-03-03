# WebResources

A curated collection of web development resources, searchable in real time with dark mode support.

**Deploy** → https://webresources.netlify.app

## Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript (strict) |
| Build | Vite 7 |
| Styling | SCSS + Bootstrap + React Bootstrap |
| Routing | React Router v6 |
| Forms | Formik |
| HTTP | Axios |
| Icons | React Icons |
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
├── components/       # UI components (Building, FilterBar, Footer, Navbar, ResourceCard, Toggle)
├── context/          # DarkModeContext
├── hooks/            # useResources
├── layouts/          # PublicLayout
├── models/           # Resource, ResourceDTO
├── pages/            # Dashboard, NotFound
├── data/             # resources.json
└── test/             # setup.ts, utils.tsx
```

## Architecture

- **SOLID** — each component and hook has a single responsibility
- **Custom hooks** — `useResources` owns resource state (data parsing, filtering)
- **Context API** — `DarkModeContext` persists dark mode preference in `localStorage`
- **Path aliases** — `@components`, `@assets`, `@models`, `@hooks`, `@context`

## Testing

Unit tests with [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/), 100% coverage on all source files.

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
