// Run this with Node.js to create PNG icons
// node create-icons.js

const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size, filename) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background with rounded corners
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    const radius = size * 0.15;
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();

    // Outer circle (eye white)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Inner circle (pupil)
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
    console.log(`Created ${filename}`);
}

// Create icons
createIcon(16, 'icons/icon-16.png');
createIcon(48, 'icons/icon-48.png');
createIcon(128, 'icons/icon-128.png');

console.log('All icons created!');
