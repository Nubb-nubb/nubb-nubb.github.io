/**
 * Utility functions for media handling (images, videos, paths)
 */

export function useMediaUtils() {
  /**
   * Converts a relative path to a full public path using the base URL
   */
  function toPublicPath(path) {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${import.meta.env.BASE_URL}${cleanPath}`
  }

  /**
   * Checks if a path points to a video file
   */
  function isVideo(path) {
    return /\.(mp4|mov|webm|ogg)$/i.test(path)
  }

  /**
   * Checks if a path points to an image file
   */
  function isImage(path) {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path)
  }

  return {
    toPublicPath,
    isVideo,
    isImage
  }
}
