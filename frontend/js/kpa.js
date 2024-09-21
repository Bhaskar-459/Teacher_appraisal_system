const kpaForm = document.getElementById('kpaForm');
let url = config.API_URL;
let teacherId = localStorage.getItem('institutionId');

function int(value) {
    val = parseFloat(value) || 0;
    return val.toFixed(2);


}

if (kpaForm) {
    kpaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collecting Teaching KPA Data
        const feedback = document.getElementById('feedback').value;
        const availability = document.getElementById('availability').value;
        const mentorship = document.getElementById('mentorship').value;
        const innovation = document.getElementById('innovation').value;
        const syllabus = document.getElementById('syllabus').value;
        const curriculum = document.getElementById('curriculum').value;
        const objectives = document.getElementById('objectives').value;
        let teachingScore = int(feedback) + int(availability) + int(mentorship) + int(innovation) + int(syllabus) + int(curriculum) + int(objectives);
        teachingScore = teachingScore / 7;

        // Professional Development Data
        const doi = document.getElementById('doi').value;
        const publications = [];
        const publicationsTable = document.querySelectorAll('#publicationsTable tbody tr');
        publicationsTable.forEach((row) => {
            const name = row.cells[1].textContent;
            const theme = row.cells[2].textContent;
            const pageNumber = row.cells[3].textContent;
            publications.push({ name, theme, pageNumber });
        });
        let professionalDevelopmentScore = 9;

        // Administrative Support Data (from tables)
        const events = [];
        const eventRows = document.querySelectorAll('#eventTable tbody tr');
        console.log(eventRows)
        eventRows.forEach((row) => {
            const eventName = row.cells[0].querySelector('input').value;
            const involvement = row.cells[1].querySelector('input').value;
            const contribution = row.cells[2].querySelector('input').value;
            const duration = row.cells[3].querySelector('input').value;
            events.push({ eventName, involvement, contribution, duration });
        });
        

        const seminars = [];
        const seminarRows = document.querySelectorAll('#seminarTable tbody tr');
        // console.log(seminarRows.row.cells[0].textContent)
        seminarRows.forEach((row) => {
            const seminarName = row.cells[0].querySelector('input').value;
            const theme = row.cells[1].querySelector('input').value;
            const type = row.cells[2].querySelector('input').value;
            const date = row.cells[3].querySelector('input').value;
            seminars.push({ seminarName, theme, type, date });
        });
        let administrativeSupportScore = 9.3;

        // console.log(seminars)
        // Other KPA Data
        const professionalDevelopment = document.getElementById('professionalDevelopment').value;
        const workDiary = document.getElementById('workDiary').value;
        const punctuality = document.getElementById('punctuality').value;
        const collaborativeWorking = document.getElementById('collaborativeWorking').value;
        let othersScore = int(professionalDevelopment) + int(workDiary) + int(punctuality) + int(collaborativeWorking);
        othersScore = othersScore / 4;


        // Create KPA Object
        const kpaData = {
            teaching: {
                feedback,
                availability,
                mentorship,
                innovation,
                syllabus,
                curriculum,
                objectives,
                teachingScore
            },
            professionalDevelopment: {
                doi,
                publications,
                professionalDevelopmentScore
            },
            administrativeSupport: {
                events,
                seminars,
                administrativeSupportScore
            },
            others: {
                professionalDevelopment,
                workDiary,
                punctuality,
                collaborativeWorking,
                othersScore
            },
            finalScore: (teachingScore + professionalDevelopmentScore + administrativeSupportScore + othersScore) / 4
        };

        try {
            const response = await fetch(`${url}/api/kpa/saveAllKPAs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({teacherId :teacherId, kpaData:kpaData })
            });

            if (response.ok) {
                alert('KPA data saved successfully');
            } else {
                alert('Failed to save KPA data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving KPA data');
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
    let id = localStorage.getItem('userId');
    // Send the data to the backend to generate the PDF
    try {
        const response = await fetch(`${url}/api/pdf/generatePdf/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(formData),
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

