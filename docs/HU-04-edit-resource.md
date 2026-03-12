# HU-04: Edit personal resource [done]

**As** a user,
**I want** to be able to edit the data of a resource I created,
**so that** I can correct errors or update information on my links.

---

## Acceptance Criteria

- [ ] Each `ResourceCard` of a user resource shows an **edit** button/icon, visible only on personal resources (not on community ones).
- [ ] Clicking it opens the same creation modal, but **pre-filled** with the current resource data.
- [ ] When saving changes, the resource is updated in `localStorage` and immediately reflected in the UI.
- [ ] The original `createdAt` date is preserved; optionally an `updatedAt` record is added.
- [ ] If no changes are made, the "Guardar" button can be disabled or simply close without writing.

---

## Technical Notes

- Reuse the modal component from [HU-03](./HU-03-create-resource.md) in edit mode.
- The `ResourceCard` needs to receive a prop or context to know if the resource is from the user (`source: "user"`).

---

## Dependencies

- [HU-03](./HU-03-create-resource.md) — Create personal resource
