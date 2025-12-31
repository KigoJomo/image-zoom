# Single Tap Zoom Demo with Hotspots

A lightweight, vanilla JavaScript demonstration of a "single tap to zoom" interaction pattern, commonly found in mobile galleries but adapted for web interactions with added contextual hotspots.

## Features

*   **Single Tap Interaction:** Zoom in or out with a simple click/tap instead of the traditional double-tap.
*   **Smart Zoom Origin:** The zoom animation centers exactly on the point where the user tapped.
*   **Interactive Hotspots:** Pulsing indicators on the image that, when tapped, zoom directly to that location and reveal context-aware details.
*   **Constrained Viewport:** The image is contained within a fixed box with no overflow, maintaining a clean UI layout.
*   **Zero Dependencies:** Built entirely with native HTML, CSS, and JavaScript.

## Project Structure

```
├── index.html    # Main structure and content
├── style.css     # Styling, animations, and transitions
├── script.js     # Logic for zoom calculations and event handling
└── README.md     # Project documentation
```

## How to Run

1.  Clone this repository.
2.  Open `index.html` in any modern web browser.

## Usage

*   **To Zoom:** Click anywhere on the image or tap a specific orange hotspot.
*   **To Unzoom:** Click anywhere on the zoomed image.
*   **Hotspots:** Tapping a hotspot will zoom specifically to that feature and slide up an information card about it.

## Customization

*   **Image:** Change the `src` attribute in `index.html` to use your own image.
*   **Hotspot Positions:** Adjust the `top` and `left` percentage values in `index.html` (e.g., `style="top: 35%; left: 25%;"`) to reposition hotspots for your specific image.
*   **Zoom Level:** Modify `.zoom-content.zoomed { transform: scale(2.5); }` in `style.css` to change the magnification factor.
