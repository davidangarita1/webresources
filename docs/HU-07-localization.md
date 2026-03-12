# HU-07: Localization (i18n) - Spanish and English support [done]

**As** a user,
**I want** the application to support both Spanish and English languages with the ability to switch between them,
**so that** I can use the application in my preferred language.

---

## Acceptance Criteria

- [x] The application detects the user's browser language preference and loads the corresponding language (Spanish or English by default).
- [x] A language selector is available in the top bar or settings (language codes: "ES / EN").
- [x] When the user changes the language, the entire UI updates in real-time except for:
  - User-created resource titles, descriptions, and tags (remain as entered)
  - Community resource data from `resources.json` (remain hardcoded unless separately translated)
- [x] The selected language preference is persisted in `localStorage` so it's remembered on subsequent visits.
- [x] All UI text is translated, including:
  - Navigation labels (Comunidad, Tus Recursos, Favoritos, Pendientes, Consumidos)
  - Button labels (Crear Recurso, Guardar, Cancelar, Editar, Eliminar)
  - Form labels and placeholders (Título, URL, Descripción, Categoría, Tags)
  - Status labels (Pendiente, Consumido, Referencia)
  - Messages and confirmations (empty states, delete confirmations, validation messages)
  - Modal titles and action buttons

### Language-specific text examples

**Spanish (ES):**
- "Comunidad" → Community
- "Tus Recursos" → Your Resources
- "Crear Recurso" → Create Resource
- "Aún no tienes recursos. ¡Crea tu primero!" → You don't have resources yet. Create your first one!
- "¿Eliminar este recurso? Esta acción no se puede deshacer." → Delete this resource? This action cannot be undone.

**English (EN):**
- "Comunidad" → Community
- "Tus Recursos" → Your Resources
- "Crear Recurso" → Create Resource
- "Aún no tienes recursos. ¡Crea tu primero!" → You don't have resources yet. Create your first one!
- "¿Eliminar este recurso? Esta acción no se puede deshacer." → Delete this resource? This action cannot be undone.

---

## Technical Notes

### Architecture

- Use an i18n library such as:
  - `react-i18next` (recommended for React + TypeScript projects)
  - `i18next` (core library)
  - Or a lightweight custom solution if preferred

### Implementation steps

1. **Install dependencies:**
   ```bash
   npm install i18next react-i18next
   ```

2. **Create translation files structure:**
   ```
   src/locales/
   ├── en/
   │   └── translation.json
   └── es/
       └── translation.json
   ```

3. **Translation file format (JSON):**
   ```json
   {
     "nav": {
       "community": "Community",
       "yourResources": "Your Resources",
       "favorites": "Favorites",
       "pending": "Pending",
       "consumed": "Consumed"
     },
     "buttons": {
       "createResource": "Create Resource",
       "save": "Save",
       "cancel": "Cancel",
       "edit": "Edit",
       "delete": "Delete"
     },
     "messages": {
       "noResources": "You don't have resources yet. Create your first one!",
       "confirmDelete": "Delete this resource? This action cannot be undone."
     }
   }
   ```

4. **Initialize i18n in `main.tsx` or app setup:**
   ```typescript
   import i18n from 'i18next'
   import { initReactI18next } from 'react-i18next'
   import enTranslation from './locales/en/translation.json'
   import esTranslation from './locales/es/translation.json'

   i18n.use(initReactI18next).init({
     resources: {
       en: { translation: enTranslation },
       es: { translation: esTranslation },
     },
     lng: localStorage.getItem('language') || navigator.language.split('-')[0] || 'en',
     fallbackLng: 'en',
     interpolation: { escapeValue: false },
   })
   ```

5. **Language selector component:**
   - Simple dropdown or flag button in Topbar
   - Stores selected language in `localStorage` (key: `language`)
   - Triggers `i18n.changeLanguage(lang)` on selection

6. **Usage in components:**
   ```typescript
   import { useTranslation } from 'react-i18next'

   export function MyComponent() {
     const { t } = useTranslation()
     return <button>{t('buttons.createResource')}</button>
   }
   ```

### Files to create/modify

- Create: `src/locales/en/translation.json`
- Create: `src/locales/es/translation.json`
- Create: `src/components/LanguageSelector.tsx` (or similar)
- Modify: `src/main.tsx` (initialize i18n)
- Modify: All components that display text (replace hardcoded strings with `t()` calls)
- Modify: `src/types/` if needed to support language-aware types

### Components needing translation

- [Sidebar.tsx](../src/components/Sidebar.tsx)
- [Dashboard.tsx](../src/pages/Dashboard/Dashboard.tsx)
- [ResourceCard.tsx](../src/components/ResourceCard.tsx)
- [SearchBar.tsx](../src/components/SearchBar.tsx)
- [Topbar.tsx](../src/components/Topbar.tsx)
- All modal components (create/edit resource forms)
- Any utility functions that generate user-facing messages

---

## Dependencies

None (independent feature, can be started at any point in the development cycle).

---

## Notes

- This feature should be implemented early to avoid having to refactor many components later.
- Consider translating community resource data (`resources.json`) in a future iteration if needed.
- Language detection can be improved to support region-specific locales (e.g., `es-MX`, `en-GB`) in the future.
