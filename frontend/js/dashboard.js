// Handling sidebar collapse functionality
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Get data from local storage and display it in the dashboard
const username = localStorage.getItem('username');
const role = localStorage.getItem('role');
const institutionId = localStorage.getItem('institutionId');

// Update the profile details
document.querySelector('.username').textContent = username || 'Teacher Name';
document.querySelector('.role').innerHTML = `<strong>Role:</strong> ${role || 'N/A'}`;
document.querySelector('.institutionId').innerHTML = `<strong>Institution ID:</strong> ${institutionId || 'N/A'}`;


