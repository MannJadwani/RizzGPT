# Favicon Setup

## Current Status
✅ SVG favicon created (`favicon.svg`) - Works in all modern browsers
✅ HTML updated to reference SVG favicon

## To Generate PNG Favicons (Optional but Recommended)

For maximum browser compatibility, you can generate PNG versions of the favicon:

### Option 1: Online Tool (Easiest)
1. Visit https://realfavicongenerator.net/
2. Upload `favicon.svg`
3. Download the generated favicon package
4. Place all files in `/public/` directory

### Option 2: Using ImageMagick (if installed)
```bash
# Convert SVG to PNG at different sizes
convert -background none -resize 16x16 favicon.svg favicon-16x16.png
convert -background none -resize 32x32 favicon.svg favicon-32x32.png
convert -background none -resize 180x180 favicon.svg apple-touch-icon.png
```

### Option 3: Using macOS sips (after converting SVG to PNG first)
If you have the SVG converted to a PNG, you can use:
```bash
sips -z 16 16 favicon.png --out favicon-16x16.png
sips -z 32 32 favicon.png --out favicon-32x32.png
sips -z 180 180 favicon.png --out apple-touch-icon.png
```

## Current Favicon Design
The favicon features:
- Purple gradient background (matching RizzGPT brand colors)
- Stylized "R" letter in white
- Small accent circle representing chat/AI

## Browser Support
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge) - SVG favicon
- ⚠️ Older browsers - Will fall back to default if PNGs not available
- ✅ Mobile browsers - SVG works great

The SVG favicon is sufficient for most use cases, but PNG versions provide better compatibility with older browsers.

