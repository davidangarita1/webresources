# HU-04: Editar recurso personal

**Como** usuario,
**quiero** poder editar los datos de un recurso que yo haya creado,
**para** corregir errores o actualizar la información de mis enlaces.

---

## Criterios de Aceptación

- [ ] En cada `ResourceCard` de un recurso del usuario se muestra un botón/ícono de **editar** (ej. ✏️), visible solo en recursos propios (no en los comunitarios).
- [ ] Al hacer clic se abre el mismo modal de creación, pero **precargado** con los datos actuales del recurso.
- [ ] Al guardar los cambios, el recurso se actualiza en `localStorage` y se refleja de inmediato en la UI.
- [ ] La fecha `createdAt` original se conserva; opcionalmente se registra un `updatedAt`.
- [ ] Si no se han hecho cambios, el botón "Guardar" puede estar deshabilitado o simplemente cerrar sin escribir.

---

## Notas Técnicas

- Reutilizar el componente modal de [HU-03](./HU-03-crear-recurso.md) en modo edición.
- La `ResourceCard` necesita recibir un prop o contexto para saber si el recurso es del usuario (`source: "user"`).

---

## Dependencias

- [HU-03](./HU-03-crear-recurso.md) — Crear recurso personal
