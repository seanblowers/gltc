// Show/Hide Back Button
function showBackButton(show) {
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = show ? 'block' : 'none';
}

// View Navigation
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Show back button if not on the default view
    showBackButton(viewId !== 'modern-view');
}

// Go Back to Default View
function goBack() {
    showView('modern-view');
}

// Reload Video
function reloadVideo(type) {
    const player = document.getElementById(`youtube-stream-${type}`);
    if (player.contentWindow) {
        player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        player.src = player.src; // Reload the iframe
    }
}

// Fullscreen Toggle
function toggleFullscreen() {
    const videoContainer = document.querySelector('.video-container');
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            alert('Error attempting to enable fullscreen mode.');
        });
    } else {
        document.exitFullscreen();
    }
}

// Initialize Default View
showView('modern-view');