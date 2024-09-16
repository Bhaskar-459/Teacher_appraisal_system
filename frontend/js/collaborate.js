document.addEventListener('DOMContentLoaded', async function () {
    const teacherSelect = document.getElementById('teacherSelect');
    const sendCollabRequestButton = document.getElementById('sendCollabRequest');
    const peerReviewTableBody = document.getElementById('peerReviewTableBody');
    let url = config.API_URL;
    // Fetch available teachers (dummy call to simulate API call)
    async function fetchTeachers() {
        try {
            const response = await fetch(`${url}/api/users/getAll`);
            const data = await response.json();
            const users = data.users;
            populateTeacherDropdown(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    let currentTeacheName = localStorage.getItem('username');
    // Populate the teacher dropdown with fetched users
    function populateTeacherDropdown(users) {
        users.forEach(user => {
            if (user.username !== currentTeacheName) {  // Replace with actual current teacher ID
                const option = document.createElement('option');
                option.value = user._id;
                option.text = user.username; // Assuming user object has a 'name' field
                teacherSelect.appendChild(option);
            }
        });
    }

    // Handle collaboration request
    sendCollabRequestButton.addEventListener('click', () => {
        const selectedTeacherId = teacherSelect.value;
        if (selectedTeacherId) {
            alert(`Collaboration request sent to teacher ID: ${selectedTeacherId}`);
            // You can also make a POST request to save the collaboration in the backend here
            // make the post request to the backend
            const topic = document.getElementById('topic').value;
            const teacherId1 = localStorage.getItem('userId');
            const teacherId2 = selectedTeacherId;
            const data = { teacherId1, teacherId2, topic };
            fetch(`${url}/api/collaborate/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Please select a teacher to send a collaboration request.');
        }
    });

    // Insert dummy data for peer reviews
    const peerReviews = [
        { publication: 'Research on AI in Education', status: 'Pending' },
        { publication: 'Machine Learning for Healthcare', status: 'Approved' },
        { publication: 'Blockchain in Supply Chain', status: 'Pending' },
    ];

    function populatePeerReviewTable() {
        peerReviews.forEach(review => {
            const row = document.createElement('tr');
            const pubCell = document.createElement('td');
            pubCell.textContent = review.publication;
            const statusCell = document.createElement('td');
            statusCell.textContent = review.status;
            row.appendChild(pubCell);
            row.appendChild(statusCell);
            peerReviewTableBody.appendChild(row);
        });
    }

    // Call functions on page load
    fetchTeachers();
    populatePeerReviewTable();
});
