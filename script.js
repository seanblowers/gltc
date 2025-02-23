function initializeApp() {
    // Generate home page buttons
    const homeGrid = document.querySelector('.home-grid');
    if (!homeGrid) {
        console.error('Home grid not found!');
        return;
    }

    console.log('Generating buttons for:', config.items); // Debug log

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