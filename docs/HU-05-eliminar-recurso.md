# HU-05: Eliminar recurso personal

**Como** usuario,
**quiero** poder eliminar un recurso que yo haya creado,
**para** mantener mi colección personal limpia y relevante.

---

## Criterios de Aceptación

- [ ] En cada `ResourceCard` de un recurso del usuario se muestra un botón/ícono de **eliminar** (ej. 🗑️), visible solo en recursos propios.
- [ ] Al hacer clic se muestra una **confirmación** (ej. dialog o modal pequeño): "¿Eliminar este recurso? Esta acción no se puede deshacer."
- [ ] Al confirmar, el recurso se elimina de `localStorage` y desaparece de la UI de inmediato.
- [ ] Los favoritos y estados asociados a ese recurso también se limpian.
- [ ] Si se cancela, no ocurre ningún cambio.

---

## Notas Técnicas

- Eliminar de la clave `user-resources` en `localStorage`.
- Limpiar las claves de favoritos/estados asociadas al `id` eliminado.

---

## Dependencias

- [HU-03](./HU-03-crear-recurso.md) — Crear recurso personal
