# HU-08: Backup and restore user resources (import/export) [done]

**As** a user,
**I want** to be able to export my personal resources as a backup file and import them back to restore my collection,
**so that** I can keep a copy of my resources safe and migrate them to another device or browser.

---

## Acceptance Criteria

- [ ] **"Crear recurso"**, **"Descargar respaldo"**, and **"Cargar respaldo"** action buttons are displayed in the **"Tus Recursos" section header** (not in the sidebar footer).
- [ ] **"Descargar respaldo"** button is only visible when the user has **at least one personal resource** saved.
- [ ] An **export** button exists in the "Tus Recursos" header, labeled **"Descargar Respaldo"**.
- [ ] Clicking the export button downloads a JSON file named `user-resources-backup-{timestamp}.json` containing all user-created resources with their favorites and status states.
- [ ] An **import** button exists in the "Tus Recursos" header, labeled **"Cargar Respaldo"**.
- [ ] A **localStorage persistence notice** is shown in the "Tus Recursos" view: _"Tus recursos se guardan localmente en este navegador. Usa Descargar respaldo para no perderlos si limpias el historial o cambias de dispositivo."_
- [ ] **User resources appear in cross-cutting filters**: Favoritos, Pendientes, Consumidos, and Categoría filters show both community and personal resources.
- [ ] The favorite star icon renders in **yellow with a glow effect** (`text-yellow-400` + `drop-shadow`) when a resource is marked as favorite; scale-125 on hover.
- [ ] Clicking the import button opens a file picker to select a previously exported JSON backup file.
- [ ] When a backup file is selected, the application validates its structure before processing:
  - [ ] File must be valid JSON
  - [ ] Must contain a `resources` array with valid resource objects
  - [ ] Each resource must have required fields: `id`, `title`, `url`, `category`
  - [ ] If validation fails, a clear error message is shown (e.g., "Archivo inválido. Por favor, selecciona un respaldo válido.")
- [ ] **URL duplicate detection and merge logic:**
  - [ ] Before importing, the application checks if any imported resource URLs already exist in the current collection
  - [ ] If a URL match is found, the user is shown a **confirmation dialog** listing the conflicts:
    - Original resource details (title, category, tags)
    - Imported resource details
    - Option to: **"Actualizar"** (update existing with imported data), **"Mantener Original"** (keep current), or **"Cancelar"** (don't import)
  - [ ] If "Actualizar" is selected, the existing resource is updated with imported data (title, description, category, tags) while preserving the original `id`, `createdAt`, and user's favorite/status preferences unless explicitly overwritten
  - [ ] If "Mantener Original" is selected, the conflicting resource is skipped
  - [ ] If "Cancelar" is selected, the entire import is canceled
- [ ] **Import success:**
  - [ ] Non-conflicting resources are added to the collection
  - [ ] Imported favorites and status states are also restored for each resource
  - [ ] A success message is shown (e.g., "Recursos restaurados correctamente. Se agregaron X recursos nuevos.") with counts of added and updated resources
  - [ ] The "Tus Recursos" view immediately reflects the imported/updated resources
- [ ] The backup file includes metadata:
  - [ ] Export timestamp
  - [ ] User's current language preference (for context, not enforced on import)
  - [ ] Number of resources backed up
  - [ ] Optional: app version info for compatibility notes

---

## Technical Notes

### Export file format

```json
{
  "meta": {
    "exportedAt": "2026-03-12T15:30:45.000Z",
    "version": "1.0",
    "resourceCount": 5,
    "language": "es"
  },
  "resources": [
    {
      "id": "uuid-1",
      "title": "React Documentation",
      "url": "https://react.dev",
      "description": "Official React docs",
      "category": "JavaScript",
      "tags": ["react", "documentation"],
      "createdAt": "2026-03-10T10:00:00.000Z",
      "source": "user"
    }
  ],
  "favorites": ["uuid-1"],
  "statuses": {
    "uuid-1": "consumed"
  }
}
```

### Implementation steps

1. **Create export service (`userResourceService.ts`):**
   - `exportResourcesToJSON(): void` - downloads JSON file with all user resources, favorites, and statuses
   - File naming: `user-resources-backup-${new Date().toISOString().split('T')[0]}.json`

2. **Create import service and validation:**
   - `validateBackupFile(data: unknown): { valid: boolean; errors: string[] }`
   - Check JSON structure, required fields, URL format validation
   - `detectURLConflicts(importedResources: UserResource[]): Map<string, ConflictInfo>`

3. **Create import dialog component (`ImportResourcesModal.tsx`):**
   - File input with drag-and-drop support
   - Parse and validate JSON
   - Display conflict resolution UI if duplicates found
   - Handle merge/skip logic based on user choice

4. **Conflict resolution dialog:**
   - Show list of conflicting resources with side-by-side comparison
   - Provide checkboxes or radio buttons to choose action for each conflict
   - Bulk actions: "Actualizar todos", "Mantener originales"

5. **Update `useUserResources` hook:**
   - Add `importBackup(backup: BackupData, mergeStrategy?: ConflictResolution[]): void`
   - Merge imported resources with existing ones respecting user choices

### Utilities

- **URL validation:** Ensure URLs are properly formatted before processing
- **Duplicate detection:** Simple URL comparison (case-insensitive, ignore query parameters for comparison)
- **File type checking:** Ensure uploaded file is JSON before parsing

### Files to create/modify

- Create: `src/services/backupService.ts` - export/import logic
- Create: `src/components/ImportResourcesModal.tsx` - UI for importing
- Create: `src/components/ConflictResolutionDialog.tsx` - conflict handling UI
- Modify: `src/hooks/useUserResources.ts` - add import/export methods
- Modify: `src/components/Sidebar.tsx` - add export/import buttons

---

## Dependencies

- [HU-02](./HU-02-your-resources.md) — "Your Resources" section (prerequisite: user resources must exist)
- [HU-03](./HU-03-create-resource.md) — Create personal resource (must understand resource structure)

---

## Notes

- The import process should be non-destructive by default (user explicitly chooses to overwrite)
- Consider adding an "advanced" mode where users can preview exactly what will change before confirming
- Future enhancement: support incremental backups or backup scheduling
