// Clock Update Function
function updateClock() {
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    };
    
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const now = new Date();
    document.querySelectorAll('.clock').forEach(clock => {
        clock.innerHTML = `
            <div>${now.toLocaleTimeString([], options)}</div>
            <div style="font-size: 1.2rem; margin-top: 5px;">
                ${now.toLocaleDateString([], dateOptions)}
            </div>
        `;
    });
}

// Initialize Clock
setInterval(updateClock, 1000);
updateClock();

// Button Hover Effects
document.querySelectorAll('.app-button, .home-button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});