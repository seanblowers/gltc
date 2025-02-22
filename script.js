let config;

// Load configuration from JSON
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        config = data;
        initializeApp();
    })
    .catch(error => console.error('Error loading config:', error));

// Initialize App
function initializeApp() {
    // Generate home page buttons
    const homeGrid = document.querySelector('.home-grid');
    config.items.forEach(item => {
        const button = document.createElement('div');
        button.className = 'home-button';
        button.onclick = () => showView(item.id);
        button.innerHTML = `
            <i class="fas ${item.icon}"></i>
            <span>${item.name}</span>
        `;
        homeGrid.appendChild(button);
    });

    // Generate views for each item
    config.items.forEach(item => {
        const view = document.createElement('div');
        view.id = `${item.id}-view`;
        view.className = 'view';
        const isPlaylist = item.type === 'playlist';
        const src = isPlaylist
            ? `https://www.youtube.com/embed/videoseries?list=${item.playlistId}`
            : `https://www.youtube.com/embed/${item.videoId}`;
        view.innerHTML = `
            <div class="video-container">
                <iframe id="${item.id}-frame" 
                        src="${src}" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen></iframe>
                <button class="fullscreen-btn" onclick="toggleFullscreen('${item.id}-view')">
                    <i class="fas fa-expand"></i> Fullscreen
                </button>
            </div>
            <button class="reload-btn" onclick="reloadFrame('${item.id}-view')">
                <i class="fas fa-sync-alt"></i> Reload
            </button>
        `;
        document.body.appendChild(view);
    });
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
    document.getElementById(`${viewId}-view`).classList.add('active');

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