## V20 — ON/OFF UI standardization

Binary controls (numeric 0/1 or text ON/OFF) now use consistent ON/OFF buttons across effects. The stored values and effect algorithms are unchanged. Scope size and edge softness still appear only when scope is ON.

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

## v15 — Research-based film-date calibration
- Film-date height at DATE SIZE 26 follows the CHINON Auto Date specification (0.7 mm on 24 mm frame = 2.92% of picture height).
- Film-date at lower right with proportional 3% right and 5% bottom margins (margins are design approximations, not verified camera specs).
- Character group spacing is proportional to the actual rendered glyph height, with narrow glyph spacing and larger year/month/day gaps.
- Restrains glow to approximate film exposure. Orange is supported by Canon documentation; green is an optional creative variant.
- DS-Digital Italic is a font approximation and does not replicate Canon's documented 6x7 dot-matrix exactly.
- Source: https://www.cameramanuals.org/chinon_specs/chinon_infoback-2.pdf
- Source: https://manualzz.com/doc/2030323/canon-sure-shot-65-zoom--prima-zoom-65-film-camera-user-m...

## V16 NIGHT VERSION research-guided revision
- Image-intensifier-inspired tonal gain with highlight compression, source-dependent scintillation, bright-source-only halo, peripheral falloff.
- New controls: scintillation, halo, edgeFalloff. Existing color, greenIntensity, gain, contrast, grain, grainSize, grainDensity, glow, scope, scopeSize, edgeSoftness, crosshair, zoom preserved.
- Reference: US Army PEO Soldier 2025 technology compendium (image intensifier), ISO/DIS 14132-5 terminology, ATN PVS-14 operator manual, Exosens phosphor P43/P45 product information.
- Limits: single-photo simulation cannot reconstruct missing low-light details or physically simulate a particular intensifier tube. Crosshair and extra glow remain creative options. Device testing not performed.

## v17 NIGHT VERSION
- Scope radius now uses the image width, default 99%, allowing the circular edge to nearly touch left/right boundaries. On landscape images, top/bottom cropping is expected from the circular optical viewport.
- SCOPE SIZE adjustable 50–110%; 100% means circle diameter equals image width.
- CROSSHAIR now offers explicit ON / OFF options; legacy numeric state remains supported.


## v18: NIGHT VERSION scope
Scope diameter now uses min(image width, image height), default 99% of the short side. CROSSHAIR ON/OFF preserved.


## V19 — unified controls
- EFFECT / GENERAL tabs across all 13 effects.
- GENERAL has shared post-processing brightness, contrast, saturation (neutral defaults 0/100/100); pre-existing per-effect tone controls remain available in GENERAL to avoid loss of functionality.
- NIGHT VERSION scope size and edge softness are only visible when SCOPE is on; FILM CAMERA date options only when date stamping is on. Hidden settings retain values.
- Preview uses shared final adjustments; exported image is based on preview canvas.


## v21 Export
- FORMAT: AUTO / JPG / PNG.
- QUALITY: SMALL / BALANCED / MAX QUALITY; hidden for PNG (lossless).
- AUTO SMALL compares JPEG 0.68 and PNG sizes; BALANCED compares JPEG 0.90 and PNG; MAX uses lossless PNG.
- JPG MAX uses quality 0.98 (still lossy). PNG is always lossless.
- The displayed file size is the encoded output size for the selected combination.
- Existing effect render pipeline and preview-resolution export behavior are unchanged.


## v22 Export UI
- FORMAT: JPG / PNG (AUTO removed).
- JPG quality: SMALL (0.68), BALANCED (0.90), MAX QUALITY (0.98).
- PNG quality: LOSSLESS only.
- Actual encoded sizes appear in parentheses directly in every final quality choice; the format selector also shows the size for its current quality.
- Size computation updates after image/effect/setting changes. PNG and JPG are encoded from the same export canvas.
