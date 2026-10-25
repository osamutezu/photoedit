# Analog Image Processor PWA v25 — Video MVP

Based on the actual v24 files; all 13 photo effects, photo export, and controls remain.

## Video (first experimental version)
- Import existing local video via OPEN VIDEO. Select any of the 13 effects. Preview, play/pause, seek, adjust EFFECT/GENERAL, SAVE VIDEO.
- Canvas capture + MediaRecorder encodes at 480px maximum dimension / 15 fps, realtime. Up to 15 seconds. MP4 if browser supports recording it; otherwise WebM.
- **Silent export (audio is NOT retained)**. No transcoding to MP4 when MP4 recording is unavailable. No upload/server processing.
- Browser support varies, particularly iOS Safari and PWA. iPhone hardware testing NOT performed.
- Frame-processing cost can lower actual fps; slow effects may stutter. Recording is realtime rather than frame-accurate offline encoding.
- Original photo mode remains available.

Upload the extracted files to GitHub Pages, replacing the previous version.


v26: Video export shows persistent download/share controls and a playable result preview; canvas dimensions are no longer reset each frame. Only video image preview is sticky; playback controls, progress and explanatory text scroll. Browser export compatibility remains device-dependent; audio not yet supported.


v27: Video export progress and resulting video actions are located directly below SAVE VIDEO (below the editor controls), instead of inside the playback panel. Primary action opens the native iOS share sheet, where the user may choose Save Video to Photos if supported. Web pages cannot silently save into the iOS Photos library. MP4 is preferred; WebM may not be supported by Photos. DOWNLOAD FILE remains as a fallback.


v28: VIDEO EXPORT QUALITY selectors for 480p/720p/1080p long edge and 15/24/30 target FPS. The source is not upscaled. MediaRecorder records canvas in real time, so actual frame rate can be lower; iOS performance is not verified. Audio remains unsupported. Existing photo and 13 effects preserved.
