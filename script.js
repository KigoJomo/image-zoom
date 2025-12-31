document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('zoomContainer');
    const zoomContent = document.getElementById('zoomContent');
    const hotspots = document.querySelectorAll('.hotspot');
    let currentOverlayId = null;

    if (!container || !zoomContent) return;

    function resetZoom() {
        zoomContent.classList.remove('zoomed');
        container.classList.remove('active');
        
        // Hide any active overlay
        if (currentOverlayId) {
            document.getElementById(currentOverlayId)?.classList.remove('visible');
            currentOverlayId = null;
        }
    }

    // Handle clicks on the container (for general zooming or unzooming)
    container.addEventListener('click', function(e) {
        // If clicking a hotspot, don't trigger this generic handler immediately
        // (Hotspot logic is handled in its own listener below)
        if (e.target.closest('.hotspot')) return;

        const isZoomed = zoomContent.classList.contains('zoomed');

        if (!isZoomed) {
            // General zoom (same as before)
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            zoomContent.style.transformOrigin = `${x}px ${y}px`;
            zoomContent.classList.add('zoomed');
            container.classList.add('active');
        } else {
            // Unzoom
            resetZoom();
        }
    });

    // Handle hotspot clicks
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent container click event

            const isZoomed = zoomContent.classList.contains('zoomed');
            const targetId = this.getAttribute('data-target');

            if (!isZoomed) {
                // 1. Zoom into the hotspot
                // We need the hotspot's position relative to the container *before* zoom
                // But since hotspots are absolutely positioned percentages, we can calculate
                // the origin based on those percentages or the current element position.
                
                // Let's use the element's center position relative to the container
                const rect = container.getBoundingClientRect();
                const hotRect = this.getBoundingClientRect();
                
                const x = (hotRect.left + hotRect.width / 2) - rect.left;
                const y = (hotRect.top + hotRect.height / 2) - rect.top;

                zoomContent.style.transformOrigin = `${x}px ${y}px`;
                zoomContent.classList.add('zoomed');
                container.classList.add('active');

                // 2. Show Overlay
                if (targetId) {
                    const overlay = document.getElementById(targetId);
                    if (overlay) {
                        overlay.classList.add('visible');
                        currentOverlayId = targetId;
                    }
                }
            } else {
                // If already zoomed, clicking a hotspot (maybe a different one?) 
                // could either switch focus or zoom out. 
                // Let's implement: Click current hotspot -> Zoom Out. Click other -> Switch.
                
                // For simplicity in this "single tap" model, clicking a hotspot while zoomed
                // acts the same as clicking elsewhere if we want a simple toggle.
                // OR, we can make it switch to that hotspot. Let's try switching focus.
                
                // Hide old overlay
                if (currentOverlayId) {
                    document.getElementById(currentOverlayId)?.classList.remove('visible');
                }

                // Recalculate zoom origin for new target (tricky with CSS transform, 
                // usually requires removing transition, resetting, then re-adding).
                // Simplest UX: Zoom out first, then user taps again?
                // Or just swap overlay if we assume the view is roughly okay?
                
                // Let's just treat it as a toggle-off for the demo to keep "single tap" consistent.
                resetZoom();
            }
        });
    });
});