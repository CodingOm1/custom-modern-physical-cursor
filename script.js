const cursor = document.querySelector('.cursor');
const pointerElement = document.querySelectorAll('.pointer');

let lastMouseX = window.innerWidth / 2;
let lastMouseY = window.innerHeight / 2;
let scaleX = 1;
let scaleY = 1;

window.addEventListener('mousemove', (event) => {
    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    // Calculate scale based on movement
    scaleX = 1 + Math.abs(deltaX) / 100;
    scaleY = 1 + Math.abs(deltaY) / 100;

    // Update cursor position and transformation
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY}) rotate(${Math.atan2(deltaY, deltaX) * (180 / Math.PI)}deg)`;

    // Set the background color to give a bubble effect
    cursor.style.backgroundColor = `rgba(255, 255, 255, ${1 - scaleX / 2})`;

    // Reset scale for a more physical feel
    setTimeout(() => {
        scaleX = 1;
        scaleY = 1;
    }, 100);
});

// Detect when cursor enters or exits the window
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'; // Show cursor
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'; // Hide cursor
});


pointerElement.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.border = '1px solid #fff';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.width = '40px'; 
        cursor.style.height = '40px'; 
    });
    
    elem.addEventListener('mouseleave', () => {
        cursor.style.border = '2px solid transparent';
        cursor.style.backgroundColor = `rgba(255, 255, 255, 0.8)`;
        cursor.style.width = '10px'; 
        cursor.style.height = '10px'; 
    });
    elem.addEventListener('click', () => {
        cursor.style.width = '35px'; 
        cursor.style.height = '35px'; 
        setTimeout(() => {
            cursor.style.width = '40px'; 
            cursor.style.height = '40px'; 
        }, 50);
    })
});