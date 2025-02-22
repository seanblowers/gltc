// Load configuration from JSON
let config;

fetch('config.json')
    .then(response => response.json())
    .then(data => {
        config = data;
        initializeVideos();
        startAutoRefresh();
    })
    .catch(error => console.error('Error loading config:', error));

// Initialize Videos
function initializeVideos() {
    const videoConfig = [
        { type: 'modern', element: 'youtube-stream-modern', fallback: 'no-video-modern' },
        { type: 'traditional', element: 'youtube-stream-traditional', fallback: 'no-video-traditional' }
    ];

    videoConfig.forEach(video => {
        const player = document.getElementById(video.element);
        const fallback = document.getElementById(video.fallback);
        const videoId = config[video.type].videoId;

        if (videoId) {
            player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            player.style.display = 'block';
            fallback.style.display = 'none';
        } else {
            player.style.display = 'none';
            fallback.style.display = 'block';
        }
    });
}

// Reload Video
function reloadVideo(type) {
    const player = document.getElementById(`youtube-stream-${type}`);
    if (player.contentWindow) {
        player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        player.src = player.src; // Reload the iframe
    }
}

// Auto Refresh
function startAutoRefresh() {
    setInterval(() => {
        reloadVideo('modern');
        reloadVideo('traditional');
    }, 30 * 60 * 1000); // 30 minutes
}

// Slideshow Functionality
let slideIndex = 0;
const slides = document.getElementsByClassName('slide');

function nextSlide() {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
}

setInterval(nextSlide, 10000);

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
}

// App Launcher
function launchApp(app) {
    switch(app) {
        case 'calendar':
            window.open('https://calendar.example.com', '_blank');
            break;
        case 'facetime':
            window.open('facetime://example@email.com');
            break;
        case 'music':
            window.open('music://');
            break;
    }
}