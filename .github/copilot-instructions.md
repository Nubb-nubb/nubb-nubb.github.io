# Copilot Agent Instructions

This is a Vue 3 + Vite + Tailwind CSS personal portfolio/hobby site.

## Component & Code Reuse

### Always Check Before Creating

1. **Check for existing components first** - Before creating UI, search `src/components/` for reusable components
2. **Check for existing composables** - Before adding utility logic, search `src/composables/` for existing functions

### Required Component Usage

3. **No duplicated modal markup** - Always use `ImagePreviewModal.vue` for image/video previews. It supports both images and videos via the `previewType` prop
4. **No duplicated tab navigation** - Always use `TabNavigation.vue` for main tabbed interfaces, or `PillTabs.vue` for pill-style sub-tabs
5. **Use `useImagePreview` composable** - For any preview functionality (handles Escape key, state management)
6. **Use `useMediaUtils` composable** - For `toPublicPath()` and `isVideo()` utilities. Never duplicate these functions
7. **Videos must use VideoThumbnail component** - Always use `VideoThumbnail.vue` for video display. Never use inline `<video>` elements with native controls. Requirements:
   - Videos display a thumbnail frame (uses `#t=0.1` media fragment for mobile compatibility)
   - Play button overlay at 50% opacity, becomes fully visible on hover
   - Clicking opens the modal for playback via `ImagePreviewModal`
   - Include `playsinline` attribute for iOS compatibility

### Existing Components Reference

| Component            | Purpose                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `ImagePreviewModal`  | Full-screen image/video preview modal                                                                                       |
| `VideoThumbnail`     | Video thumbnail with play button overlay (50% opacity, full on hover); uses `#t=0.1` for mobile thumbnail; click to preview |
| `TabNavigation`      | Horizontal tab navigation with v-model (main tabs with overflow menu on mobile)                                             |
| `PillTabs`           | Pill-style sub-tabs with horizontal scroll on mobile                                                                        |
| `AlbumGrid`          | Apple Photos-style album grid with thumbnails; click to view contents, back button to return                                |
| `CollapsibleSection` | Expandable accordion section                                                                                                |
| `SetupEntry`         | Image gallery entry with era/title/caption                                                                                  |
| `WorkshopCard`       | Card for workshop items                                                                                                     |
| `AppFooter`          | Site footer with social links                                                                                               |

### Existing Composables Reference

| Composable        | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| `useImagePreview` | Preview state management, Escape key handling              |
| `useMediaUtils`   | `toPublicPath()`, `isVideo()`, `isImage()` utilities       |
| `useCarousel`     | Auto-scroll carousel with touch swipe support (4s default) |

## Tailwind Best Practices

7. **No dynamic class construction** - Never use template literals like `` `border-${color}` `` or `` `hover:text-${color}` ``. Tailwind JIT won't detect dynamically constructed class names. Instead, use explicit class mappings:

```javascript
// ❌ BAD - Tailwind won't include these classes
const borderClass = computed(() => `border-${props.color}`)

// ✅ GOOD - Explicit mapping
const colorClasses = {
  'accent-red': 'border-accent-red',
  'plant-green': 'border-plant-green',
}
const borderClass = computed(() => colorClasses[props.color] || 'border-accent-red')
```

## Vue Best Practices

8. **Remove unused imports** - Don't import Vue lifecycle hooks (`onMounted`, `onBeforeUnmount`, etc.) unless actually used
9. **Use v-model pattern** - Components should use `modelValue` prop + `update:modelValue` emit for two-way binding
10. **Props validation** - Always define proper types and defaults for props

## Architecture Patterns

11. **Extract repeated patterns** - If a UI pattern appears 2+ times, consider making it a component
12. **Composables for shared logic** - If utility functions are used in 2+ files, create a composable in `src/composables/`
13. **Keep views thin** - Views should orchestrate components, not contain complex repeated markup

## Code Smells to Avoid

14. **No inline modal HTML** - Never duplicate modal markup; use `ImagePreviewModal`
15. **No copy-pasted utility functions** - If you find `toPublicPath` or `isVideo` being duplicated, use `useMediaUtils`
16. **No hardcoded paths** - Always use `import.meta.env.BASE_URL` via `toPublicPath()` for public assets
17. **No repeated tab UI** - If you see tab button loops being duplicated, use `TabNavigation` or `PillTabs`
18. **No inline video players** - Never use raw `<video>` elements with native controls; always use `VideoThumbnail` with modal playback

## When to Create New Components

Create a new component when:

- The same markup pattern appears in 2+ places
- A section of a view exceeds ~50 lines of template
- The UI has its own state logic that can be encapsulated

Create a new composable when:

- The same utility function appears in 2+ files
- Reactive state + methods need to be shared across components
- Side effects (event listeners, lifecycle) need to be reused

## Project Structure

```
src/
├── components/       # Reusable UI components
├── composables/      # Shared composition functions
├── router/           # Vue Router config
├── views/            # Page-level components
│   └── hobbies/      # Hobby tab sub-views
├── App.vue           # Root component with nav
├── main.js           # App entry point
└── style.css         # Global Tailwind styles
```

## Nubbnubb Shorts

19. **Add videos to Shorts queue** - Whenever a new video is added anywhere on this site (in `public/images/`), it must also be added to the `allVideos` array in `src/views/ShortsView.vue`. This ensures all videos appear in the TikTok-style Nubbnubb Shorts feed.
