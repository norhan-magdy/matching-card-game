const bubbleContainer = document.querySelector('.bubbles');
for (let i = 0; i < 100; i++) {
    const bubble = document.createElement('span');
    bubble.style.setProperty('--i', i % 10); // Variable for animation delay
    bubbleContainer.appendChild(bubble);
}