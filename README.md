# Analog Image Processor — PWA v8

Based on v7. Adds export format selection with **actual encoded file sizes** next to SMART, LOSSLESS PNG, HIGH QUALITY and PNG. The encoding is performed on-device and file sizes update after preview changes. All formats share the exact v7 export dimensions and pixels before compression.

SMART prioritizes PNG for graphic effects (pixel-accurate edges) and chooses the smallest encoded candidate for photographic effects. HIGH QUALITY compares browser-supported WebP and JPEG at quality 0.95. LOSSLESS and PNG both use PNG; they therefore have the same file size. Browser codec support may vary.

Note: WebP/JPEG are lossy; identical visual quality cannot be guaranteed. Output pixels are still derived from the v7 preview; this version does not restore original-image resolution detail.

Upload all runtime files to the root of your existing GitHub Pages repository. Version: v8.

V9: FILM CAMERA date stamp OFF / PHOTO DATE (JPEG EXIF or PNG eXIf) / MANUAL, size control. If no capture metadata, no fabricated date. Stamped preview is identical to saved output. HEIC capture metadata may not be available to the browser; use MANUAL.

## v10
FILM CAMERA date stamp color: ORANGE / GREEN. All v9 controls preserved.
