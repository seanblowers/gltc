// Video Configuration
const videoConfig = [
    {
        element: 'youtube-stream1',
        fallback: 'no-video1',
        videoId: 'VIDEO_ID_1' // Replace with actual ID or null
    },
    {
        element: 'youtube-stream2',
        fallback: 'no-video2',
        videoId: 'VIDEO_ID_2' // Replace with actual ID or null
    }
];

// Initialize Videos
function initializeVideos() {
    videoConfig.forEach(config => {
        const player = document.getElementById(config.element);
        const fallback = document.getElementById(config.fallback);
        
        if (config.videoId) {
            player.src = `https://www.youtube.com/embed/${config.videoId}?autoplay=1`;
            player.style.display = 'block';
            fallback.style.display = 'none';
        } else {
            player.style.display = 'none';
            fallback.style.display = 'block';
        }
    });
}

// Slideshow Functionality
let slideIndex = 0;
const slides = document.getElementsByClassName('slide');

function nextSlide() {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
}

// Change slide every 10 seconds
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

// Video Controls
function pauseAllVideos() {
    videoConfig.forEach(config => {
        const player = document.getElementById(config.element);
        if (player.contentWindow) {
            player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
}

function playAllVideos() {
    videoConfig.forEach(config => {
        const player = document.getElementById(config.element);
        if (player.contentWindow) {
            player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeVideos);