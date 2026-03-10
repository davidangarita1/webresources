# HU-06: Soporte para recursos tipo video de YouTube

**Como** usuario,
**quiero** que cuando un recurso (comunitario o personal) tenga una URL de YouTube, se muestre con un formato de tarjeta de video con miniatura,
**para** identificar visualmente los videos y poder reproducirlos directamente dentro de la aplicación.

---

## Criterios de Aceptación

- [ ] La aplicación detecta automáticamente si una URL es de YouTube (formatos soportados: `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/embed/`).
- [ ] Si el recurso es un video de YouTube, la `ResourceCard` se renderiza en un **formato de tarjeta de video** que incluye:
  - **Miniatura** del video (obtenida de `https://img.youtube.com/vi/{VIDEO_ID}/mqdefault.jpg`).
  - Ícono de ▶️ superpuesto sobre la miniatura para indicar que es reproducible.
  - Título, descripción y metadatos del recurso como en las tarjetas normales.
- [ ] Al hacer clic en la miniatura o en el botón de reproducir, se abre un **reproductor embebido** (iframe de YouTube) dentro de la misma página, ya sea:
  - Expandiendo la tarjeta inline, o
  - Abriendo un modal con el reproductor.
- [ ] El resto de la funcionalidad de la tarjeta (favoritos, estados, editar/eliminar si es del usuario) se mantiene intacta.
- [ ] La detección aplica tanto a recursos de `resources.json` (comunidad) como a recursos creados por el usuario.

---

## Notas Técnicas

- Crear utilidad `youtubeUtils.ts` con funciones:
  - `isYouTubeUrl(url: string): boolean`
  - `extractYouTubeId(url: string): string | null`
  - `getYouTubeThumbnail(videoId: string): string`
- El iframe del reproductor debe usar `youtube-nocookie.com` para mejorar la privacidad.
- Considerar un componente `YouTubeCard` que extienda o envuelva `ResourceCard`, o condicional dentro de la misma card.
- Para el modal de reproducción, reutilizar el patrón de modal de [HU-03](./HU-03-crear-recurso.md).

---

## Dependencias

Ninguna (independiente, puede implementarse en paralelo).
