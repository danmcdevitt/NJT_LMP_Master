# Video Optimization Guide for "One Contact" Section

## Current Situation
- **Display Size**: ~360-500px height, 2:1 aspect ratio (much smaller than hero)
- **Current File Sizes**: 
  - WebM: 2.1MB
  - MP4: 4.3MB
- **Hero Video**: Full viewport (800px+ height)

## Recommended Optimization

Since the "One contact" video is displayed in a much smaller container, we should create a lower resolution version:

### Target Resolution
- **Width**: 1280px (720p) or 960px (for even smaller file)
- **Height**: 640px (720p) or 480px
- **Aspect Ratio**: Maintain 2:1 ratio

### FFmpeg Commands

#### Option 1: 720p (1280x640) - Balanced quality/size
```bash
# WebM (VP9 codec - best compression)
ffmpeg -i "Sequence 03-converted.mp4" \
  -vf "scale=1280:640:force_original_aspect_ratio=decrease,pad=1280:640:(ow-iw)/2:(oh-ih)/2" \
  -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus -b:a 96k \
  "Sequence 03-optimized.webm"

# MP4 (H.264 codec - fallback)
ffmpeg -i "Sequence 03-converted.mp4" \
  -vf "scale=1280:640:force_original_aspect_ratio=decrease,pad=1280:640:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k \
  "Sequence 03-optimized.mp4"
```

#### Option 2: Smaller 960x480 (for even better compression)
```bash
# WebM
ffmpeg -i "Sequence 03-converted.mp4" \
  -vf "scale=960:480:force_original_aspect_ratio=decrease,pad=960:480:(ow-iw)/2:(oh-ih)/2" \
  -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus -b:a 96k \
  "Sequence 03-optimized.webm"

# MP4
ffmpeg -i "Sequence 03-converted.mp4" \
  -vf "scale=960:480:force_original_aspect_ratio=decrease,pad=960:480:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k \
  "Sequence 03-optimized.mp4"
```

### Expected File Size Reduction
- **Current**: WebM 2.1MB, MP4 4.3MB
- **After 720p optimization**: WebM ~800KB-1.2MB, MP4 ~1.5MB-2MB
- **After 960p optimization**: WebM ~500KB-800KB, MP4 ~1MB-1.5MB

### After Creating Optimized Videos
1. Replace files in `lmp-site/public/`:
   - `Sequence 03-optimized.webm` → `Sequence 03-converted.webm`
   - `Sequence 03-optimized.mp4` → `Sequence 03-converted.mp4`
2. Or update the code to use `Sequence 03-optimized.*` filenames

