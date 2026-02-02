function moveButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.container');

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Safe boundaries (keep it well inside the window)
    const padding = 20;
    const btnWidth = Math.min(btnRect.width, 100); // safety cap if rect is zero
    const btnHeight = Math.min(btnRect.height, 50);

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Ensure we don't return negative values if screen is small
    const safeMaxX = Math.max(padding, maxX);
    const safeMaxY = Math.max(padding, maxY);

    const newX = Math.floor(Math.random() * (safeMaxX - padding)) + padding;
    const newY = Math.floor(Math.random() * (safeMaxY - padding)) + padding;

    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.right = 'auto';
    noBtn.style.bottom = 'auto'; // Clear bottom if set
    noBtn.style.zIndex = '9999'; // Ensure it's on top of everything
}

// Add touch support for mobile to ensure it moves on tap attempt
document.getElementById('no-btn').addEventListener('touchstart', function (e) {
    e.preventDefault(); // prevents click
    moveButton();
});

function showLove() {
    // Hide question
    const questionContainer = document.getElementById('question-container');
    questionContainer.style.display = 'none';

    // Show letter container
    const letterContainer = document.getElementById('letter-container');
    letterContainer.classList.remove('hidden');

    // Show first card
    // default is card-1 visible because others are hidden by class
}

function nextCard(cardNumber) {
    // Hide current card
    const currentCard = document.getElementById(`card-${cardNumber - 1}`);
    if (currentCard) {
        currentCard.classList.add('hidden');
    }

    // Show next card
    const nextCard = document.getElementById(`card-${cardNumber}`);
    if (nextCard) {
        nextCard.classList.remove('hidden');
        // Add animation class re-trigger if needed, but CSS animation on display block usually works once
    }
}

function restart() {
    location.reload();
}
