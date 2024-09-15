const kpaForm = document.getElementById('kpaForm');
let url = config.API_URL;
let teacherId = localStorage.getItem('institutionId');
if (kpaForm) {
    kpaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // KPA 1: Teaching KPA Data
        const feedback = document.getElementById('feedback').value;
        const availability = document.getElementById('availability').value;
        const mentorship = document.getElementById('mentorship').value;
        const innovation = document.getElementById('innovation').value;
        const syllabus = document.getElementById('syllabus').value;
        const curriculum = document.getElementById('curriculum').value;
        const objectives = document.getElementById('objectives').value;

        // KPA 2: Professional Development Data
        const doi = document.getElementById('doi').value;
        const publications = [];
        const publicationsTable = document.querySelectorAll('#publicationsTable tbody tr');
        publicationsTable.forEach((row) => {
            const name = row.cells[1].querySelector('input').value;
            const theme = row.cells[2].querySelector('input').value;
            const pageNumber = row.cells[3].querySelector('input').value;
            publications.push({ name, theme, pageNumber });
        });

        // KPA 3: Administrative Support Data (Events and Seminars)
        const events = [];
        const eventRows = document.querySelectorAll('#eventTable tbody tr');
        eventRows.forEach((row) => {
            const name = row.cells[0].querySelector('input').value;
            const involvement = row.cells[1].querySelector('input').value;
            const contribution = row.cells[2].querySelector('input').value;
            const duration = row.cells[3].querySelector('input').value;
            events.push({ name, involvement, contribution, duration });
        });

        const seminars = [];
        const seminarRows = document.querySelectorAll('#seminarTable tbody tr');
        seminarRows.forEach((row) => {
            const name = row.cells[0].querySelector('input').value;
            const theme = row.cells[1].querySelector('input').value;
            const type = row.cells[2].querySelector('input').value;
            const date = row.cells[3].querySelector('input').value;
            seminars.push({ name, theme, type, date });
        });

        // KPA 4: Others
        const professionalDevelopment = document.getElementById('professionalDevelopment').value;
        const workDiary = document.getElementById('workDiary').value;
        const punctuality = document.getElementById('punctuality').value;
        const collaborativeWorking = document.getElementById('collaborativeWorking').value;

        // Consolidating all data into a single object
        const kpaData = {
            teaching: {
                feedback,
                availability,
                mentorship,
                innovation,
                syllabus,
                curriculum,
                objectives
            },
            professionalDevelopment: {
                doi,
                publications
            },
            administrativeSupport: {
                events,
                seminars
            },
            others: {
                professionalDevelopment,
                workDiary,
                punctuality,
                collaborativeWorking
            }
        };

        try {
            // Making API request to save all KPA data
            const response = await fetch(`${url}/api/kpa/saveAllKPAs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({teacherId,kpaData})
            });

            const data = await response.json();
            if (data.success) {
                alert('KPA Data Saved Successfully');
            } else {
                alert('Error saving KPA data');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to save KPA data.');
        }
    });
}

// Event handler for adding dynamic rows for events and seminars
document.getElementById('addEventRow').addEventListener('click', function () {
    const table = document.getElementById('eventTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" placeholder="Enter Event Name"></td>
        <td><input type="text" placeholder="Enter Involvement"></td>
        <td><input type="text" placeholder="Enter Contribution"></td>
        <td><input type="text" placeholder="Enter Duration"></td>
    `;
});

document.getElementById('addSeminarRow').addEventListener('click', function () {
    const table = document.getElementById('seminarTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" placeholder="Enter Seminar Name"></td>
        <td><input type="text" placeholder="Enter Theme"></td>
        <td><input type="text" placeholder="Enter Type"></td>
        <td><input type="date" placeholder="Enter Date"></td>
    `;
});
