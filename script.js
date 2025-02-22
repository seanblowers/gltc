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
    const modernPlayer = document.getElementById('youtube-stream-modern');
    const traditionalPlayer = document.getElementById('youtube-stream-traditional');

    if (config.modern.videoId) {
        modernPlayer.src = `https://www.youtube.com/embed/${config.modern.videoId}?autoplay=1`;
        modernPlayer.style.display = 'block';
        document.getElementById('no-video-modern').style.display = 'none';
    } else {
        modernPlayer.style.display = 'none';
        document.getElementById('no-video-modern').style.display = 'block';
    }

    if (config.traditional.videoId) {
        traditionalPlayer.src = `https://www.youtube.com/embed/${config.traditional.videoId}?autoplay=1`;
        traditionalPlayer.style.display = 'block';
        document.getElementById('no-video-traditional').style.display = 'none';
    } else {
        traditionalPlayer.style.display = 'none';
        document.getElementById('no-video-traditional').style.display = 'block';
    }
}

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

    // Show back button if not on the home page
    showBackButton(viewId !== 'home-view');
}

// Go Back to Home Page
function goBack() {
    showView('home-view');
}

// Reload Frame
function reloadFrame(viewId) {
    const frame = document.getElementById(`${viewId}`).querySelector('iframe');
    frame.src = frame.src; // Reload the iframe
}

// Fullscreen Toggle
function toggleFullscreen(viewId) {
    const container = document.getElementById(viewId).querySelector('.video-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert('Error attempting to enable fullscreen mode.');
        });
    } else {
        document.exitFullscreen();
    }
}

// Initialize Default View
showView('home-view');