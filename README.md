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
