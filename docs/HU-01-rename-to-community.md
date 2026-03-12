# HU-01: Rename "All" to "Community"

**As** an application user,
**I want** the navigation button "Todos" (which shows resources from `resources.json`) to be renamed to "Comunidad" (or another representative name),
**so that** I can clearly differentiate between shared catalog resources and my personal resources.

---

## Acceptance Criteria

- [ ] The sidebar navigation item that currently says **"Todos"** with icon 📋 is renamed to **"Comunidad"** with an appropriate icon (e.g., 🌐).
- [ ] The Dashboard view title when this filter is selected shows **"Recursos de la Comunidad"** instead of "Todos los recursos".
- [ ] The internal filter (`ViewFilter`) changes from `"all"` to `"community"` (or remains `"all"` with updated visual labels).
- [ ] Resources displayed continue to come from `resources.json` (no data logic changes).
- [ ] Empty state texts are adapted to the new name.

---

## Technical Notes

- Impacted files: [Sidebar.tsx](../src/components/Sidebar.tsx), [Dashboard.tsx](../src/pages/Dashboard/Dashboard.tsx), [resourceStore.ts](../src/store/resourceStore.ts).
- Label changes in `NAV_ITEMS` and `FILTER_LABELS`.

---

## Dependencies

None.
