# Analog Image Processor PWA v13 — functional audit

Built from the actual v12 ZIP. Preserves all 13 effects, date stamp with DS-DIGII.TTF, languages, and Smart Export.

## Corrected
- NIGHT VERSION: grainSize affects the grain pattern.
- CRT: curvature now bends the screen.
- RISOGRAPH: contrast and grain change the dot pattern.
- ASCII ART: density, gamma and saturation affect rendering.
- LOW POLY: edgeSensitivity affects triangle color sampling.
- ATMOSPHERE: each named preset changes the color treatment.
- FILM CAMERA: COLOR NEGATIVE is distinct from other presets.
- 1-BIT DITHER: Bayer cell indexing respects pixel scale.
- Export: prevent saving an outdated compression result after the image changes.
- Service worker version bumped for refresh.

## Audit scope and limitations
Source-level inspection and JavaScript syntax validation; not a complete real-device regression test. FILM CAMERA date controls are implemented in index.html (not effects.js). Additional issues may exist on specific browsers or photo formats. Browser support for JPEG/PNG EXIF, WebP, and sharing varies. Existing PWA image effects are approximate browser implementations, not pixel-identical to the Swift version.

## Install
Upload all ZIP contents to the GitHub Pages repository root. Verify V13 label, and clear the older PWA cache if necessary. Confirm that the font's license permits redistribution.

## v14
FILM CAMERAの撮影日刻印を右下に移動。数字のグループ間隔をフォントサイズに対する比率で制御し、参考画像に近い年・月・日表示に変更。
