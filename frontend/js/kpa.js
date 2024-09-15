// Handle form submission
const kpaForm = document.getElementById('kpaForm');
let url = config.API_URL;
if (kpaForm) {
    kpaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collecting data from the form
        const feedback = document.getElementById('feedback').value;
        const availability = document.getElementById('availability').value;
        const mentorship = document.getElementById('mentorship').value;
        const innovation = document.getElementById('innovation').value;
        const syllabus = document.getElementById('syllabus').value;
        const curriculum = document.getElementById('curriculum').value;
        const objectives = document.getElementById('objectives').value;
        const doi = document.getElementById('doi').value;

        const publications = [];
        document.querySelectorAll('#publicationsTable tbody tr').forEach((row) => {
            const cells = row.querySelectorAll('td');
            publications.push({
                name: cells[1].innerText,
                theme: cells[2].innerText,
                page: cells[3].innerText
            });
        });

        const events = [];
        document.querySelectorAll('#eventTable tbody tr').forEach((row) => {
            const cells = row.querySelectorAll('td');
            events.push({
                name: cells[0].innerText,
                involvement: cells[1].innerText,
                contribution: cells[2].innerText,
                duration: cells[3].innerText
            });
        });

        const seminars = [];
        document.querySelectorAll('#seminarTable tbody tr').forEach((row) => {
            const cells = row.querySelectorAll('td');
            seminars.push({
                name: cells[0].innerText,
                theme: cells[1].innerText,
                type: cells[2].innerText,
                date: cells[3].innerText
            });
        });

        const others = [];
        document.querySelectorAll('#othersTable tbody tr').forEach((row) => {
            const cells = row.querySelectorAll('td');
            others.push({
                remarks: cells[0].innerText,
                score: cells[1].innerText
            });
        });

        // Send POST request to save KPA data
        const response = await fetch(`${url}/api/kpa/saveAllKPAs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                feedback, availability, mentorship, innovation, syllabus, curriculum, objectives,
                doi, publications, events, seminars, others 
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert('All KPAs saved successfully!');
        } else {
            alert('Error saving KPAs: ' + result.message);
        }
    });
}

// Add event listeners for dynamic table functionalities
document.getElementById('fetchPublications')?.addEventListener('click', async () => {
    const doi = document.getElementById('doi').value;
    // filling dummy data
    const publications = [
        { name: 'Publication 1', theme: 'Theme 1', page: '1-10' },
        { name: 'Publication 2', theme: 'Theme 2', page: '11-20' },
        { name: 'Publication 3', theme: 'Theme 3', page: '21-30' },
    ];
    const table = document.getElementById('publicationsTable').querySelector('tbody');
    table.innerHTML = '';
    publications.forEach((pub) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td contenteditable="true"></td>
            <td contenteditable="true">${pub.name}</td>
            <td contenteditable="true">${pub.theme}</td>
            <td contenteditable="true">${pub.page}</td>
        `;
    });

});

document.getElementById('addEventRow')?.addEventListener('click', () => {
    const table = document.getElementById('eventTable').querySelector('tbody');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
    `;
});

document.getElementById('addSeminarRow')?.addEventListener('click', () => {
    const table = document.getElementById('seminarTable').querySelector('tbody');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
    `;
});

document.getElementById('addOthersRow')?.addEventListener('click', () => {
    const table = document.getElementById('othersTable').querySelector('tbody');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
    `;
});

// Add more event listeners for calculations if needed
