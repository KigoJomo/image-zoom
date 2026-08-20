# Image Zoom

A dependency-free image viewer with single-tap zooming and fixed hotspots.

Clicking the image zooms toward the point you clicked. Clicking a hotspot zooms to its location and opens a short detail card. A second click returns to the full image.

## Run it

Open `index.html` in a browser. There is no install or build step.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Adapt it

- Change the image `src` in `index.html`.
- Position hotspots with percentage-based `top` and `left` values.
- Edit the associated labels and descriptions in the same file.
- Change the scale in `.zoom-content.zoomed` inside `style.css`.

The demo uses plain HTML, CSS, and JavaScript. Hotspot coordinates are hand-authored, and the current version does not include keyboard navigation or pinch-to-zoom.
