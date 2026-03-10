# HU-01: Renombrar sección "Todos" a "Comunidad"

**Como** usuario de la aplicación,
**quiero** que el botón de navegación "Todos" (que muestra los recursos de `resources.json`) se renombre a "Comunidad" (u otro nombre representativo),
**para** diferenciar claramente los recursos del catálogo compartido de los recursos personales del usuario.

---

## Criterios de Aceptación

- [ ] El ítem de navegación del sidebar que actualmente dice **"Todos"** con ícono 📋 pasa a llamarse **"Comunidad"** con un ícono acorde (ej. 🌐).
- [ ] El título de la vista del Dashboard cuando se selecciona este filtro muestra **"Recursos de la Comunidad"** en lugar de "Todos los recursos".
- [ ] El filtro interno (`ViewFilter`) cambia de `"all"` a `"community"` (o se mantiene `"all"` con la etiqueta visual actualizada).
- [ ] Los recursos mostrados siguen siendo los provenientes de `resources.json` (sin cambios en lógica de datos).
- [ ] Los textos de estado vacío se adaptan al nuevo nombre.

---

## Notas Técnicas

- Archivos impactados: [Sidebar.tsx](../src/components/Sidebar.tsx), [Dashboard.tsx](../src/pages/Dashboard/Dashboard.tsx), [resourceStore.ts](../src/store/resourceStore.ts).
- Cambio de label en `NAV_ITEMS` y en `FILTER_LABELS`.

---

## Dependencias

Ninguna.
