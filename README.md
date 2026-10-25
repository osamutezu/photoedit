# AnalogImageProcessor PWA v33 — Fixed FPS experimental export

Built from actual v32 files, preserving existing 13 effects, photo export, trim, quality, audio-capable realtime export, and sharing.

## New VIDEO EXPORT ENGINE
- REALTIME · AUDIO (default): v32 recording method, retains source audio where supported, can drop frames on slow effects.
- FIXED FPS · SILENT (BETA): frame-by-frame seek, effect render, WebCodecs H.264 encoding with explicit timestamps, self-contained MP4 muxing. Video-only (NO AUDIO). This is an experimental alternative, not a proven fix for Safari; browser support and decoding performance vary.
- The fixed mode uses the selected trim range, resolution, and FPS. It may take longer than the source clip to process. For 30 seconds at 30fps, approximately 900 frames are encoded.

## Limitations
- Fixed FPS mode exports SILENT video. It cannot preserve audio yet. Use REALTIME mode to retain source audio.
- Fixed FPS mode depends on Safari WebCodecs H.264 encoding and accurate seek support. Not tested on a physical iPhone. Some videos may fail or produce inaccurate source frame selection due to seek precision.
- This mode processes each requested output frame and assigns evenly spaced timestamps, but does not guarantee source frames are all distinct (video decoder may seek to nearest available frame).
- If FIXED FPS fails, use the existing REALTIME mode.
- Both modes retain the existing share/download buttons.

## Validation
JavaScript syntax checked with Node, ZIP integrity checked. iPhone Safari runtime not tested.

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


## v29 — Source audio (experimental)
- VIDEO EXPORT QUALITY > SOURCE AUDIO: ON / KEEP or OFF / SILENT. Default ON.
- Uses Web Audio MediaElementAudioSourceNode and MediaStreamDestination to add an audio track to the canvas capture stream.
- If Web Audio is unavailable or MediaRecorder rejects the audio track, falls back to silent export when possible.
- Audio capture/muxing and Photos compatibility depend on iOS Safari's encoder. Verify the exported file's sound before relying on it.
- No backend, no third-party dependency. 15s maximum and existing resolutions/FPS preserved.


## V30 source audio fix
- Unmute the source HTMLVideoElement for Web Audio capture; silence speaker output using a zero-gain Web Audio branch. Some Safari versions produce silent Web Audio when the media element itself is muted.
- Add an analyser-based audio activity warning. This is not a guarantee of a playable audio track in the final file.
- iPhone Safari runtime test is required; silent source videos and unsupported recorder audio codecs remain possible.


## V31 — Video trim and longer clips
- Remove the 15-second hard limit. IN/OUT sliders set a selected time interval; default is the full source.
- Encoding progress is relative to the selected interval, below SAVE VIDEO. Audio KEEP remains enabled by default.
- Real-time MediaRecorder encoding remains memory/performance constrained, especially on iPhone. Long exports are not guaranteed.
- No automatic memory optimization or pause/resume; test short clips before longer ones.


## v32 frame scheduling / diagnostics
During video export, the normal preview animation loop no longer processes frames. The export loop skips duplicate video timestamps, and UI/progress updates are throttled. Export progress shows measured processed frames per wall-clock second. The output still uses real-time canvas.captureStream and MediaRecorder; this does not guarantee the requested FPS or solve expensive per-frame effects. Audio capture, trim, formats, and 13 effects are preserved.


## v34 — MIRROR HORIZONTAL
- Added OFF/ON horizontal mirror control in the photo editor, below effect/general settings.
- Default OFF for every newly imported or camera-captured image; no automatic selfie detection because iOS file input does not reliably expose front-camera provenance.
- Flip is applied to the source image before the effect, so overlays such as the film date stamp remain readable and the saved image matches the preview.
- Photo gallery thumbnails reflect the mirror state. Video mode is unaffected.
- For a selfie whose orientation differs from the camera preview, switch MIRROR HORIZONTAL to ON.


## v35: Dedicated camera
- + CAMERA / 撮影 opens a getUserMedia camera interface (HTTPS required).
- FRONT preview is mirrored and captured pixels are mirrored once, so the edit preview matches the camera preview. BACK is not mirrored.
- SWITCH toggles preferred front/back camera; the actual camera is device-dependent.
- Camera tracks stop on capture, close, or page visibility loss.
- Existing image import, manual MIRROR HORIZONTAL, video editing, and all effects remain.
- iPhone Safari runtime has not been verified.
