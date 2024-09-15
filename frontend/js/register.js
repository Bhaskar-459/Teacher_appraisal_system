document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const institutionId = document.getElementById('institutionId').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('/api/auth/register', {
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
            // Redirect or take further actions here
            if (role === 'admin') window.location.href = '/admin';
            else window.location.href = '/dashboard';
        } else {
            alert('Registration failed: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
