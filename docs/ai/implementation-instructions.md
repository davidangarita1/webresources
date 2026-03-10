# Bookmark Manager PWA — AI Implementation Instructions

Este documento describe cómo un agente de IA debe implementar la aplicación **Bookmark Manager PWA**.

La aplicación gestiona miles de enlaces web almacenados en un **archivo JSON estático**.

⚠️ IMPORTANTE

La aplicación **NO tiene backend** y **NO permite crear ni editar recursos desde la UI**.

Los recursos solo pueden agregarse manualmente editando el archivo:

```
src/data/resources.json
```

La aplicación solo permite al usuario:

- marcar favoritos
- cambiar estados de consumo
- buscar recursos
- explorar categorías

Todos los cambios del usuario se almacenan en:

```
localStorage
```

---

# 1. Objetivo del Proyecto

Crear una **aplicación web PWA** para visualizar y gestionar marcadores web.

El usuario mantiene una colección de más de **1000 enlaces** almacenados en un archivo JSON.

La aplicación debe permitir:

- explorar recursos
- buscar rápidamente
- marcar favoritos
- marcar contenido pendiente
- marcar contenido consumido

Pero **NO modificar el JSON original**.

---

# 2. Restricción Fundamental

El archivo JSON es **fuente de verdad de los recursos**.

El usuario:

- solo puede editar el JSON manualmente
- la aplicación solo lo lee

Todos los estados dinámicos se almacenan en:

```
localStorage
```

---

# 3. Stack Tecnológico

### Base

- Vite
- React
- TypeScript

### UI

- TailwindCSS

### Búsqueda

- Fuse.js

### Estado

- Zustand

### Performance

- react-window o react-virtual

### PWA

- vite-plugin-pwa

### Testing

- Vitest
- React Testing Library

---

# 4. Principios de Arquitectura

El código debe seguir:

- SOLID principles
- Clean Code
- Separation of Concerns
- Functional components
- Custom hooks
- Modular architecture
- DRY
- KISS
- YAGNI

El objetivo es un código:

- mantenible
- escalable
- testeable
- legible

---

# 5. Reglas de Idioma

### Código

Todo el **código debe estar en inglés**:

- variables
- funciones
- clases
- interfaces
- no hay comentarios

### Interfaz

Todos los **textos visibles al usuario deben estar en español**.

Ejemplo:

```ts
const statusLabel = {
  pending: "Pendiente",
  consumed: "Consumido",
  reference: "Referencia"
}
```

---

# 6. Modelo de Datos

El archivo JSON contiene únicamente la información base del recurso.

```ts
export interface Resource {
  id: string
  title: string
  url: string
  description?: string
  category: string
  tags: string[]
  createdAt: string
}
```

El JSON **no contiene estados dinámicos**.

---

# 7. Estados Dinámicos del Usuario

Los estados se almacenan en **localStorage**.

```ts
export type ResourceStatus =
  | "pending"
  | "consumed"
  | "reference"
```

Estructura sugerida:

```ts
interface UserState {
  favorites: string[]
  statuses: Record<string, ResourceStatus>
}
```

Ejemplo:

```json
{
  "favorites": ["1", "5"],
  "statuses": {
    "1": "pending",
    "2": "consumed"
  }
}
```

---

# 8. Persistencia

## Recursos

Cargar desde:

```
src/data/resources.json
```

Este archivo es **read-only**.

---

## Estado del usuario

Guardar en:

```
localStorage
```

Claves recomendadas:

```
bookmark_favorites
bookmark_statuses
```

---

# 9. Arquitectura del Proyecto

Estructura recomendada:

```
src/

app/
App.tsx
providers.tsx

components/
ResourceCard.tsx
SearchBar.tsx
Sidebar.tsx
TagList.tsx
CategoryList.tsx

features/resources/
components/
hooks/
services/
selectors/

pages/
Dashboard.tsx
Favorites.tsx
Pending.tsx
Consumed.tsx

hooks/
useResources.ts
useFavorites.ts
useStatuses.ts
useSearch.ts

store/
resourceStore.ts

services/
storageService.ts
searchService.ts
resourceService.ts

utils/
url.ts
date.ts

data/
resources.json

types/
resource.ts
userState.ts

tests/
```
Refactoriza lo existente para seguir esta estructura modular y organizada.
Refactoriza el archivo resources.json actual y elimina pendings.json para que solo contenga la información base de los recursos, sin estados dinámicos.
---

# 10. Patrones de Diseño

El agente debe aplicar estos patrones cuando sea apropiado:

### Repository Pattern

Para acceder a los recursos del JSON.

```
resourceRepository
```

---

### Service Layer

Para lógica de negocio:

```
storageService
searchService
resourceService
```

---

### Custom Hooks Pattern

Para encapsular lógica React:

```
useResources
useFavorites
useStatuses
useSearch
```

---

### State Management Pattern

Usar Zustand para estado global.

---

# 11. Componentes Principales

## ResourceCard

Debe mostrar:

- favicon
- title
- domain
- tags
- category
- status
- botón favorito
- botón cambiar estado
- botón abrir enlace

---

## Sidebar

Navegación:

```
Todos
Pendientes
Consumidos
Favoritos
Categorías
```

---

## SearchBar

Debe usar:

```
Fuse.js
```

Buscar sobre:

- title
- description
- tags
- url
- category

---

# 12. Performance

La app debe manejar **miles de recursos**.

Implementar virtualización con:

```
react-window
```

o

```
react-virtual
```

---

# 13. UI/UX

Inspiración visual:

- Notion
- Raindrop
- Linear

Layout:

```
Sidebar
Topbar
Main Content
```

Topbar incluye:

- buscador global

---

# 14. Preview de Sitios

Mostrar favicon existente.

# 15. Testing (TDD)

El agente debe escribir **tests unitarios** para:

### Servicios

- storageService
- searchService

### Hooks

- useFavorites
- useStatuses

### Componentes críticos

- ResourceCard
- SearchBar

Herramientas:

```
Vitest
React Testing Library
```

Principios:

- tests independientes
- mocks cuando sea necesario
- coverage de lógica crítica

---

# 16. Clean Code Rules

El código debe seguir estas reglas:

- funciones pequeñas
- nombres descriptivos
- evitar duplicación
- separar lógica de UI
- evitar componentes gigantes
- máximo ~150 líneas por componente

---

# 17. Funciones del Usuario

El usuario puede:

### Marcar favorito

Guardar ID en localStorage.

---

### Cambiar estado

Estados:

```
pending
consumed
reference
```

---

### Buscar recursos

Búsqueda fuzzy con Fuse.js.

---

# 18. Funciones NO permitidas

La aplicación **NO debe permitir**:

- crear recursos
- editar recursos
- eliminar recursos
- modificar JSON

El JSON solo se modifica manualmente.

---

# 19. Gitflow

Crea una rama y PR en ingles para todo lo anterior, u haz atomic commits siguiendo una estructura convencional clara. 

# 20. Objetivo Final

Crear una **PWA rápida y mantenible** para explorar más de **1000 marcadores web**.

Debe ser:

- rápida
- offline
- escalable
- sin backend
- basada en JSON
- mantenible con buenas prácticas de ingeniería.