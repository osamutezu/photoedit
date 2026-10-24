# Analog Image Processor PWA v3

Based on PWA v2; SwiftUI v35 used as reference.

## Updated
- NIGHT VERSION: true circular scope based on min(width,height), feathered edges, scope size, zoom, crosshair, green intensity, grain controls.
- BLOB TRACKING: connected-component analysis instead of fixed grid boxes; variable bounding rectangles, coordinate labels, center marks, sparse edges.
- DATAMOSH: seeded block scatter, vertically elongated trails, wave distortion with wave scale, chroma bleed.
- All other PWA v2 effects and editor retained.

## Limitations
This is **not a complete feature-for-feature port** of SwiftUI v35. Other effects, controls, exact output fidelity, full-resolution rendering and localization require further audit/porting. Coordinate labels in v3 refer to the rendered canvas, not always the original photograph. The original SwiftUI project is unchanged.

Upload the contents (not ZIP) to the root of GitHub Pages repository. The updated sw.js cache key helps refresh installed PWAs.
