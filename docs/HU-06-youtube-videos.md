# HU-06: YouTube video resource support

**As** a user,
**I want** that when a resource (community or personal) has a YouTube URL, it displays in a video card format with a thumbnail,
**so that** I can visually identify videos and play them directly within the application.

---

## Acceptance Criteria

- [ ] The application automatically detects if a URL is from YouTube (supported formats: `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/embed/`).
- [ ] If the resource is a YouTube video, the `ResourceCard` renders in a **video card format** that includes:
  - **Thumbnail** of the video (obtained from `https://img.youtube.com/vi/{VIDEO_ID}/mqdefault.jpg`).
  - A play icon overlaid on the thumbnail to indicate it's playable.
  - Resource title, description, and metadata as in normal cards.
- [ ] Clicking the thumbnail or play button opens an **embedded player** (YouTube iframe) within the same page, either:
  - By expanding the card inline, or
  - By opening a modal with the player.
- [ ] The rest of the card functionality (favorites, states, edit/delete if it's from the user) remains intact.
- [ ] Detection applies to both `resources.json` resources (community) and user-created resources.

---

## Technical Notes

- Create utility `youtubeUtils.ts` with functions:
  - `isYouTubeUrl(url: string): boolean`
  - `extractYouTubeId(url: string): string | null`
  - `getYouTubeThumbnail(videoId: string): string`
- The player iframe should use `youtube-nocookie.com` to improve privacy.
- Consider a `YouTubeCard` component that extends or wraps `ResourceCard`, or conditional within the same card.
- For the playback modal, reuse the modal pattern from [HU-03](./HU-03-create-resource.md).

---

## Dependencies

None (independent, can be implemented in parallel).
