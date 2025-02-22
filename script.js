// Initialize YouTube Stream (Replace VIDEO_ID with actual live stream ID)
const youtubeIframe = document.getElementById('youtube-stream');
youtubeIframe.src = 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1';

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

// iPad-specific viewport fix
window.addEventListener('orientationchange', () => {
    window.scrollTo(0, 0);
});
