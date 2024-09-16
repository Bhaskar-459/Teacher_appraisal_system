
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const institutionId = document.getElementById('institutionId').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
   // access from env file
    let url = config.API_URL;

    try {
        const response = await fetch(`${url}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ institutionId, username, password, role })
        });
        // store in local storage
        localStorage.setItem('role', role);
        localStorage.setItem('institutionId', institutionId);
        localStorage.setItem('username', username);

        const result = await response.json();
        if (response.ok) {
            alert('Registration successful!');
            localStorage.setItem('userId', result.user.id);
            // Redirect or take further actions here
            if (role === 'admin') window.location.href = '/frontend/admin.html';
            else window.location.href = '/frontend/dashboard.html';
        } else {
            alert('Registration failed: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
