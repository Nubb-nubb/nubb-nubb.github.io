# Copilot Agent Instructions

This is a Vue 3 + Vite + Tailwind CSS personal portfolio/hobby site.

## Component & Code Reuse

### Always Check Before Creating
1. **Check for existing components first** - Before creating UI, search `src/components/` for reusable components
2. **Check for existing composables** - Before adding utility logic, search `src/composables/` for existing functions

### Required Component Usage
3. **No duplicated modal markup** - Always use `ImagePreviewModal.vue` for image/video previews. It supports both images and videos via the `previewType` prop
4. **No duplicated tab navigation** - Always use `TabNavigation.vue` for tabbed interfaces
5. **Use `useImagePreview` composable** - For any preview functionality (handles Escape key, state management)
6. **Use `useMediaUtils` composable** - For `toPublicPath()` and `isVideo()` utilities. Never duplicate these functions

### Existing Components Reference
| Component | Purpose |
|-----------|---------|
| `ImagePreviewModal` | Full-screen image/video preview modal |
| `TabNavigation` | Horizontal tab navigation with v-model |
| `CollapsibleSection` | Expandable accordion section |
| `SetupEntry` | Image gallery entry with era/title/caption |
| `WorkshopCard` | Card for workshop items |
| `AppFooter` | Site footer with social links |

### Existing Composables Reference
| Composable | Purpose |
|------------|---------|
| `useImagePreview` | Preview state management, Escape key handling |
| `useMediaUtils` | `toPublicPath()`, `isVideo()`, `isImage()` utilities |

## Tailwind Best Practices

7. **No dynamic class construction** - Never use template literals like `` `border-${color}` `` or `` `hover:text-${color}` ``. Tailwind JIT won't detect dynamically constructed class names. Instead, use explicit class mappings:

```javascript
// ❌ BAD - Tailwind won't include these classes
const borderClass = computed(() => `border-${props.color}`)

// ✅ GOOD - Explicit mapping
const colorClasses = {
  'accent-red': 'border-accent-red',
  'plant-green': 'border-plant-green'
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
17. **No repeated tab UI** - If you see tab button loops being duplicated, use `TabNavigation`

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
