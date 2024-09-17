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
            const name = row.cells[1].textContent;
            const theme = row.cells[2].textContent;
            const pageNumber = row.cells[3].textContent;
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
        if (seminarRows.length !== 0) {
            seminarRows.forEach((row) => {
                const name = row.cells[0].querySelector('input').value;
                const theme = row.cells[1].querySelector('input').value;
                const type = row.cells[2].querySelector('input').value;
                const date = row.cells[3].querySelector('input').value;
                seminars.push({ name, theme, type, date });
            });
        };

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
                objectives,
                averageScore: document.getElementById('teachingScore').textContent
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
                collaborativeWorking,
                averageScore: document.getElementById('othersScore').textContent
            }
        };

        try {
            // Making API request to save all KPA data
            const response = await fetch(`${url}/api/kpa/saveAllKPAs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teacherId, kpaData })
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

// on clicking fetch publications button, randomly 3 publications are added statically on latest technology themes
document.getElementById('fetchPublications').addEventListener('click', function () {
    const table = document.getElementById('publicationsTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    const publications = [
        { sno: 1, name: 'Publication 1', theme: 'Machine Learning', pageNumber: '10-14' },
        { sno: 2, name: 'Publication 2', theme: 'Artificial Intelligence', pageNumber: '15-28' },
        { sno: 3, name: 'Publication 3', theme: 'Data Science', pageNumber: '22-24' }
    ];
    publications.forEach((publication) => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${publication.sno}</td>
            <td>${publication.name}</td>
            <td>${publication.theme}</td>
            <td>${publication.pageNumber}</td>
        `;
    });
});

// Teaching KPA Score Calculation
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculateTeaching').addEventListener('click', function () {
        const feedback = parseFloat(document.getElementById('feedback').value) || 0;
        const availability = parseFloat(document.getElementById('availability').value) || 0;
        const mentorship = parseFloat(document.getElementById('mentorship').value) || 0;
        const innovation = parseFloat(document.getElementById('innovation').value) || 0;
        const syllabus = parseFloat(document.getElementById('syllabus').value) || 0;
        const curriculum = parseFloat(document.getElementById('curriculum').value) || 0;
        const objectives = parseFloat(document.getElementById('objectives').value) || 0;

        let totalTeachingScore = feedback + availability + mentorship + innovation + syllabus + curriculum + objectives;
        totalTeachingScore = totalTeachingScore / 7;
        document.getElementById('teachingScore').textContent = totalTeachingScore.toFixed(2);
    });

    // Professional Development KPA Score Calculation
    document.getElementById('calculatePD').addEventListener('click', function () {
        const doi = document.getElementById('doi').value;
        if (!doi) {
            alert('Please enter a valid DOI and fetch publications first.');
            return;
        }

        const publicationsTable = document.getElementById('publicationsTable').getElementsByTagName('tbody')[0];
        const numOfPublications = publicationsTable.rows.length;

        const pdScore = 9
        document.getElementById('pdScore').textContent = pdScore.toFixed(2);
    });

    // Administrative Support KPA Score Calculation
    document.getElementById('calculateAdminSupport').addEventListener('click', function () {
        const eventTable = document.getElementById('eventTable').getElementsByTagName('tbody')[0];
        const seminarTable = document.getElementById('seminarTable').getElementsByTagName('tbody')[0];

        const numOfEvents = eventTable.rows.length;
        const numOfSeminars = seminarTable.rows.length;

        const adminSupportScore = 9.3
        document.getElementById('adminSupportScore').textContent = adminSupportScore.toFixed(2);
    });

    // Others KPA Score Calculation
    document.getElementById('calculateOthers').addEventListener('click', function () {
        const professionalDevelopment = parseFloat(document.getElementById('professionalDevelopment').value) || 0;
        const workDiary = parseFloat(document.getElementById('workDiary').value) || 0;
        const punctuality = parseFloat(document.getElementById('punctuality').value) || 0;
        const collaborativeWorking = parseFloat(document.getElementById('collaborativeWorking').value) || 0;

        let totalOthersScore = professionalDevelopment + workDiary + punctuality + collaborativeWorking;
        totalOthersScore = totalOthersScore / 4;
        document.getElementById('othersScore').textContent = totalOthersScore.toFixed(2);
    });
});

document.querySelectorAll('.fetch-btn').forEach(button => {
    button.addEventListener('click', function() {
        const target = document.getElementById(this.getAttribute('data-target'));
        const status = document.getElementById(`${this.getAttribute('data-target')}Status`);

        // Show fetching status
        status.textContent = 'Fetching from LMS...';
        
        // Simulate delay and then fill with random value
        setTimeout(() => {
            const randomScore = Math.floor(Math.random() * 4) + 7; // Generates a number between 7-10
            target.value = randomScore;
            status.textContent = ''; // Clear fetching status after completion
        }, 2000); // 2 second delay
    });
});

document.getElementById('saveAsPdf').addEventListener('click', async () => {
    const formData = {
        // KPA 1: Teaching
        teaching: {
            feedback: document.getElementById('feedback').value,
            availability: document.getElementById('availability').value,
            mentorship: document.getElementById('mentorship').value,
            innovation: document.getElementById('innovation').value,
            syllabus: document.getElementById('syllabus').value,
            curriculum: document.getElementById('curriculum').value,
            objectives: document.getElementById('objectives').value,
            teachingScore: document.getElementById('teachingScore').textContent
        },
        // KPA 2: Professional Development
        professionalDevelopment: {
            doi: document.getElementById('doi').value,
            publications: [],  // Will be populated with publication details
            pdScore: document.getElementById('pdScore').textContent
        },
        // KPA 3: Administrative Support
        administrativeSupport: {
            events: [],  // Will be populated with event details
            seminars: [],  // Will be populated with seminar details
            adminSupportScore: document.getElementById('adminSupportScore').textContent
        },
        // KPA 4: Others
        others: {
            professionalDevelopment: document.getElementById('professionalDevelopment').value,
            workDiary: document.getElementById('workDiary').value,
            punctuality: document.getElementById('punctuality').value,
            collaborativeWorking: document.getElementById('collaborativeWorking').value,
            othersScore: document.getElementById('othersScore').textContent
        }
    };

    // Fetch publications table data
    const publicationsTable = document.querySelectorAll('#publicationsTable tbody tr');
    publicationsTable.forEach((row) => {
        const publication = {
            name: row.cells[1].textContent,
            theme: row.cells[2].textContent,
            pageNumber: row.cells[3].textContent,
        };
        formData.professionalDevelopment.publications.push(publication);
    });

    // Fetch events table data
    const eventTable = document.querySelectorAll('#eventTable tbody tr');
    eventTable.forEach((row) => {
        const event = {
            name: row.cells[0].textContent,
            involvement: row.cells[1].textContent,
            contribution: row.cells[2].textContent,
            duration: row.cells[3].textContent,
        };
        formData.administrativeSupport.events.push(event);
    });

    // Fetch seminars table data
    const seminarTable = document.querySelectorAll('#seminarTable tbody tr');
    seminarTable.forEach((row) => {
        const seminar = {
            name: row.cells[0].textContent,
            theme: row.cells[1].textContent,
            type: row.cells[2].textContent,
            date: row.cells[3].textContent,
        };
        formData.administrativeSupport.seminars.push(seminar);
    });

    // Send the data to the backend to generate the PDF
    try {
        const response = await fetch(`${url}/api/pdf/generatePdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'kpa-report.pdf';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('Failed to generate PDF');
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF');
    }
});

