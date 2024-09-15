// collaborate.js

const startCollabButton = document.getElementById('startCollab');
if (startCollabButton) {
    startCollabButton.addEventListener('click', () => {
        alert('Starting collaboration...');
        window.location.href = 'ai-review.html';
    });
}
