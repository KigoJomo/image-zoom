const image = document.getElementById('zoomImage');
const indicator = document.getElementById('zoomIndicator');
const zoomLevelDisplay = document.getElementById('zoomLevel');
const container = image.parentElement;

let isZoomed = false;
let scale = 1;
const maxScale = 3;

// Pan state
let isPanning = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;
let currentTranslateX = 0;
let currentTranslateY = 0;

// Track if user is dragging vs tapping
let isDragging = false;
const dragThreshold = 5;
let initialPointerX = 0;
let initialPointerY = 0;

function updateTransform() {
  image.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

function clampTranslation() {
  if (scale <= 1) {
    translateX = 0;
    translateY = 0;
    return;
  }

  const rect = container.getBoundingClientRect();
  const imageWidth = rect.width * scale;
  const imageHeight = rect.height * scale;

  // Calculate max translation (accounting for scale in translate)
  const maxTranslateX = (imageWidth - rect.width) / (2 * scale);
  const maxTranslateY = (imageHeight - rect.height) / (2 * scale);

  translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
  translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
}

function toggleZoom(e) {
  if (isDragging) return;

  if (!isZoomed) {
    // Zoom in to tap location
    const rect = container.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    // Calculate offset from center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    scale = maxScale;

    // Translate to center the tap point
    translateX = (centerX - x) / scale;
    translateY = (centerY - y) / scale;

    clampTranslation();
    isZoomed = true;
    image.classList.add('zoomed');
    indicator.textContent = 'Tap to reset';
  } else {
    // Zoom out
    scale = 1;
    translateX = 0;
    translateY = 0;
    isZoomed = false;
    image.classList.remove('zoomed');
    indicator.textContent = 'Tap to zoom';
  }

  zoomLevelDisplay.textContent = `${scale}x`;
  updateTransform();
}

// Pointer events for unified mouse/touch handling
function onPointerDown(e) {
  if (!isZoomed) return;

  e.preventDefault();
  isPanning = true;
  isDragging = false;

  const clientX = e.clientX || e.touches?.[0]?.clientX;
  const clientY = e.clientY || e.touches?.[0]?.clientY;

  initialPointerX = clientX;
  initialPointerY = clientY;
  startX = clientX;
  startY = clientY;
  currentTranslateX = translateX;
  currentTranslateY = translateY;
}

function onPointerMove(e) {
  if (!isPanning) return;

  e.preventDefault();

  const clientX = e.clientX || e.touches?.[0]?.clientX;
  const clientY = e.clientY || e.touches?.[0]?.clientY;

  const deltaX = clientX - initialPointerX;
  const deltaY = clientY - initialPointerY;

  // Check if we've moved enough to be considered a drag
  if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
    isDragging = true;
  }

  const dx = clientX - startX;
  const dy = clientY - startY;

  translateX = currentTranslateX + dx / scale;
  translateY = currentTranslateY + dy / scale;

  clampTranslation();
  updateTransform();
}

function onPointerUp() {
  isPanning = false;
}

// Mouse events
image.addEventListener('mousedown', onPointerDown);
window.addEventListener('mousemove', onPointerMove);
window.addEventListener('mouseup', onPointerUp);

// Touch events
image.addEventListener('touchstart', onPointerDown, { passive: false });
window.addEventListener('touchmove', onPointerMove, { passive: false });
window.addEventListener('touchend', onPointerUp);

// Click/tap to toggle zoom
image.addEventListener('click', toggleZoom);

// Prevent context menu on long press
image.addEventListener('contextmenu', (e) => e.preventDefault());
