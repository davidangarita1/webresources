# HU-03: Create personal resource (CRUD — Create)

**As** a user,
**I want** to be able to create a new resource by filling out a form in a modal,
**so that** I can add my own links to my personal collection without needing to edit code.

---

## Acceptance Criteria

- [ ] A visible **"Crear Recurso"** button (e.g., with ➕ icon) exists and is accessible from the sidebar or top bar.
- [ ] Clicking it opens a **modal** with a form that includes the following fields:

  | Field       | Type         | Required | Notes                                           |
  |-------------|--------------|----------|--------------------------------------------------|
  | Título      | text         | ✅       | Name of the resource                            |
  | URL         | url          | ✅       | Link to the resource. URL format is validated   |
  | Descripción | textarea     | ❌       | Optional description                            |
  | Categoría   | select/text  | ✅       | Can choose an existing one or write a new one   |
  | Tags        | chips/text   | ❌       | Tags separated by comma                         |

- [ ] When saving, a unique `id` (e.g., UUID) and `createdAt` timestamp are generated.
- [ ] The resource is persisted in `localStorage` (key `user-resources`).
- [ ] The new resource appears immediately in the "Tus Recursos" view.
- [ ] Required fields are validated before saving; clear error messages are displayed.
- [ ] The modal can be closed without saving (cancel / click outside / Escape key).

---

## Technical Notes

- The user resource model reuses the existing `Resource` interface, optionally adding a `source: "user"` field to differentiate it.
- New service: `userResourceService` with CRUD methods for `localStorage`.
- Consider a `useUserResources` hook to encapsulate the logic.

### Proposed data model

```typescript
// Extension of Resource for user resources
interface UserResource extends Resource {
  source: "user"      // Differentiates from community resources
  updatedAt?: string  // Last edit date (optional)
}

// localStorage key: "user-resources"
// Value: UserResource[]
```

---

## Dependencies

- [HU-02](./HU-02-your-resources.md) — "Your Resources" section
