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
