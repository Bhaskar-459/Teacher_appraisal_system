document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const institutionId = document.getElementById('instituionId').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role, institutionId })
        });

        // store in local storage
        localStorage.setItem('role', role);
        localStorage.setItem('institutionId', institutionId);
        localStorage.setItem('username', username);
        

        const result = await response.json();
        if (response.ok) {
            document.getElementById('roleDisplay').style.display = 'block';
            document.getElementById('role').textContent = result.user.role;
            alert('Login successful!');
            if (role === 'admin') window.location.href = '/admin';
            else window.location.href = '/dashboard';
        } else {
            alert('Login failed: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
