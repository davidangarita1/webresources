# HU-05: Delete personal resource

**As** a user,
**I want** to be able to delete a resource I created,
**so that** I can keep my personal collection clean and relevant.

---

## Acceptance Criteria

- [ ] Each `ResourceCard` of a user resource shows a **delete** button/icon (e.g., 🗑️), visible only on personal resources.
- [ ] Clicking it shows a **confirmation** (e.g., dialog or small modal): "¿Eliminar este recurso? Esta acción no se puede deshacer."
- [ ] Upon confirmation, the resource is deleted from `localStorage` and immediately disappears from the UI.
- [ ] Favorites and states associated with that resource are also cleaned up.
- [ ] If canceled, no changes occur.

---

## Technical Notes

- Delete from the `user-resources` key in `localStorage`.
- Clean up favorite/state keys associated with the deleted `id`.

---

## Dependencies

- [HU-03](./HU-03-create-resource.md) — Create personal resource
