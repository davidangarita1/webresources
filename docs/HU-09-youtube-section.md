# HU-09 — Dedicated YouTube Videos Section

## Business Context

The bookmark catalogue includes a growing number of resources with YouTube URLs:
tutorials, conferences, livestreams, and video courses. Currently these resources
are mixed visually with the rest of the catalogue, forcing the user to scan card
by card to identify multimedia content.

As the collection grows, this mix creates friction: the user cannot tell at a
glance how much video content is available, nor access it quickly in a grouped
view.

## Objective

Visually separate resources with YouTube URLs from the rest, grouping them in a
dedicated section within the Dashboard. This improves user experience by allowing
multimedia content to be consumed in a more direct and organised way.

## User Story

**As** a user of the application,  
**I want** to see resources that are YouTube videos in a visually separate section
from the rest of the resources,  
**So that** I can quickly identify video content, play it without losing the page
context, and distinguish it from non-multimedia content.

---

## Acceptance Criteria

### 1. Visually separate section in the Dashboard

- [ ] In any active view (Community, Your Resources, Favorites, Pending,
  Consumed, Category, Videos), resources with YouTube URLs are shown grouped
  under the heading **"YouTube Videos"**.
- [ ] Regular (non-YouTube) resources are shown in a separate section below the
  videos section, under the heading **"Other Resources"**.
- [ ] The "Other Resources" heading is only shown when both YouTube and
  non-YouTube resources exist simultaneously in the active view.
- [ ] If all resources in the view are YouTube or all are regular, only one
  section is shown (no redundant heading).

### 2. YouTube section heading

- [ ] The heading includes the YouTube icon (red) followed by the text
  "YouTube Videos".
- [ ] The heading shows a badge with the count of videos in the section
  (e.g. "3 videos").
- [ ] The heading includes a button to **collapse or expand** the section,
  showing the appropriate icon (chevron up / down).
- [ ] When collapsed, the video cards disappear but the heading remains visible.

### 3. "Videos" filter in the sidebar

- [ ] The sidebar includes a new navigation entry called **"Videos"**
  (with a red YouTube icon).
- [ ] Clicking "Videos" shows only the resources (community and personal) whose
  URLs are detected as YouTube.
- [ ] The "Videos" filter is highlighted the same way as other filters
  (indigo background when selected).

### 4. Video cards — no behaviour changes

- [ ] Cards inside the YouTube section retain all existing functionality:
  favorite, status, edit (if applicable), delete (if applicable), Open button,
  Play button, and the embedded player modal.
- [ ] The card grid is the same as the rest of the Dashboard (responsive:
  1 col mobile, 2 col sm, 3 col lg, 4 col xl).

### 5. Internationalisation

- [ ] All new texts are available in Spanish and English:
  - Section heading: "Videos de YouTube" / "YouTube Videos"
  - Count badge: "1 video" / "2 videos" (correct pluralisation)
  - Collapse button aria-label: "Colapsar videos" / "Collapse videos"
  - Expand button aria-label: "Expandir videos" / "Expand videos"
  - Regular section heading: "Otros Recursos" / "Other Resources"
  - Sidebar filter: "Videos" / "Videos"

### 6. Accessibility

- [ ] The YouTube section uses a semantic `<section>` element.
- [ ] The collapse/expand button has a descriptive `aria-label`.
- [ ] The section heading uses `<h3>` for correct hierarchy.

---

## Expected Technical Behaviour

### YouTube URL Detection

The existing `isYouTubeUrl(url)` function from `src/utils/youtube.ts` is reused
to classify resources in the Dashboard view.

### Store Filter (`ViewFilter`)

`"videos"` is added as a new value for the `ViewFilter` type in the Zustand
store. The `getFilteredResources()` function adds the case:

```ts
case "videos":
  return allResources.filter((r) => isYouTubeUrl(r.url))
```

### `YouTubeSection` Component

New component `src/components/YouTubeSection.tsx` that encapsulates:
- Local `isCollapsed` state (defaults to `false`)
- Heading with icon, title, count badge, and collapse button
- `ResourceCard` grid with the same props as the main Dashboard

### Dashboard Changes

`src/pages/Dashboard/Dashboard.tsx` splits `filteredResources` into:
- `youtubeResources = filteredResources.filter(r => isYouTubeUrl(r.url))`
- `regularResources = filteredResources.filter(r => !isYouTubeUrl(r.url))`

And conditionally renders:
1. `<YouTubeSection>` (if `youtubeResources.length > 0`)
2. "Other Resources" sub-heading (if both sections have resources)
3. Grid of `regularResources` (if `regularResources.length > 0`)

---

## Impact on Existing Modules

| Module | Change |
|---|---|
| `src/store/resourceStore.ts` | Adds `"videos"` to `ViewFilter` and `getFilteredResources` |
| `src/components/Sidebar.tsx` | Adds "Videos" entry to the navigation menu |
| `src/components/YouTubeSection.tsx` | New component |
| `src/pages/Dashboard/Dashboard.tsx` | Splits resources into YouTube + regular sections |
| `src/locales/es/translation.json` | New keys for the section |
| `src/locales/en/translation.json` | New keys for the section |
| `src/types/` | No changes (reuses existing `Resource` and `ResourceStatus`) |

---

## Exclusions

- **No** editing or deleting curated catalogue resources from this section
  (same restriction as the rest of the application).
- **No** new columns added to the `Resource` data model.
- **No** changes to the existing video player behaviour.
