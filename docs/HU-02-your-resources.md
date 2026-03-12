# HU-02: "Your Resources" section for user links [done]

**As** a user,
**I want** a button in the sidebar called "Tus Recursos" (or "Tus Enlaces"),
**so that** I can view only the resources I have created and saved locally, separate from community resources.

---

## Acceptance Criteria

- [ ] A new sidebar item is added: **"Tus Recursos"** with a representative icon (e.g., 👤 or 📌).
- [ ] Clicking it displays Dashboard showing exclusively resources created by the user (stored in `localStorage`).
- [ ] If the user has no personal resources, an empty state is shown with a guide message (e.g., "Aún no tienes recursos. ¡Crea tu primero!") and a button/link to create one.
- [ ] User resources are rendered with the same `ResourceCard` component and support favorites, states (pending, consumed, reference), and tags.
- [ ] The resource counter reflects only user resources.

---

## Technical Notes

- A new value in `ViewFilter` is required (e.g., `"user"`).
- User resources are stored in `localStorage` under a dedicated key (e.g., `user-resources`).
- The store must be able to combine or segment community and user resources based on the active filter.

---

## Dependencies

- [HU-01](./HU-01-rename-to-community.md) — Rename "Todos" to "Comunidad"
