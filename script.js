// Hardcoded data for testing
const config = {
    items: [
        {
            id: "modern",
            name: "Modern Worship",
            icon: "fa-guitar"
        },
        {
            id: "traditional",
            name: "Traditional Worship",
            icon: "fa-church"
        },
        {
            id: "matlock",
            name: "Matlock",
            icon: "fa-gavel"
        }
    ]
};

// Initialize App
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
        button.innerHTML = `
            <i class="fas ${item.icon}"></i>
            <span>${item.name}</span>
        `;
        homeGrid.appendChild(button);
    });
}

// Initialize the app
initializeApp();