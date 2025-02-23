let config;

// Load configuration from JSON
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        config = data;
        initializeVideos();
    })
    .catch(error => console.error('Error loading config:', error));

// Initialize Videos
function initializeVideos() {
    setVideo('youtube-stream-modern', config.modern?.videoId, 'no-video-modern');
    setVideo('youtube-stream-traditional', config.traditional?.videoId, 'no-video-traditional');
    
    // Load additional TV Shows (Matlock & Columbo)
    setVideo('matlock-frame', config.matlock?.videoId, 'matlock-view');
    setVideo('columbo-frame', config.columbo?.videoId, 'columbo-view');
}

// Helper function to set video sources dynamically
function setVideo(iframeId, videoId, messageId) {
    const iframe = document.getElementById(iframeId);
    const noVideoMessage = document.getElementById(messageId);

    if (videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.style.display = 'block';
        if (noVideoMessage) noVideoMessage.style.display = 'none';
    } else {
        iframe.style.display = 'none';
        if (noVideoMessage) noVideoMessage.style.display = 'block';
    }
}

// Toggle Fullscreen
function toggleFullscreen(viewId) {
    const view = document.getElementById(viewId);
    if (!document.fullscreenElement) {
        view.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Reload Video Frame
function reloadFrame(viewId) {
    const iframe = document.querySelector(`#${viewId} iframe`);
    if (iframe) {
        iframe.src = iframe.src; // Reload by resetting the src
    }
}
