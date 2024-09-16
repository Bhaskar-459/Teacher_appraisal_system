const startAIReviewButton = document.getElementById('startAIReview');
if (startAIReviewButton) {
    startAIReviewButton.addEventListener('click', () => {
        // Simulate fetching KPA data
        const kpaData = {
            Teaching: {
                StudentFeedback: 'Excellent',
                CourseDesign: 'Good',
                StudentOutcomes: 'Satisfactory'
            },
            Research: {
                Publications: 'High',
                Impact: 'Moderate'
            },
            Service: {
                CommitteeWork: 'Active',
                CommunityOutreach: 'Moderate'
            }
        };

        // Display KPA Data
        displayKPAData(kpaData);
        
        // Display Recommendations
        displayRecommendations();
    });
}

function displayKPAData(kpaData) {
    const mainContent = document.querySelector('.main-content');
    
    let kpaTableHtml = '<h3>KPA Data</h3><table border="1"><thead><tr><th>Category</th><th>Subcategory</th><th>Value</th></tr></thead><tbody>';
    
    for (const [category, subcategories] of Object.entries(kpaData)) {
        for (const [subcategory, value] of Object.entries(subcategories)) {
            kpaTableHtml += `<tr><td>${category}</td><td>${subcategory}</td><td>${value}</td></tr>`;
        }
    }
    
    kpaTableHtml += '</tbody></table>';
    
    mainContent.innerHTML += kpaTableHtml;
}

function displayRecommendations() {
    const mainContent = document.querySelector('.main-content');
    
    let recommendationsHtml = `
        <h3>Recommended Reading & Courses</h3>
        <h4>Books on Blockchain:</h4>
        <ul>
            <li><a href="https://www.amazon.com/dp/1492053247" target="_blank">Mastering Blockchain by Imran Bashir</a></li>
            <li><a href="https://www.amazon.com/dp/1800565976" target="_blank">Blockchain Basics by Daniel Drescher</a></li>
            <li><a href="https://www.amazon.com/dp/1119505500" target="_blank">Blockchain Revolution by Don Tapscott & Alex Tapscott</a></li>
        </ul>
        <h4>Data Science Courses:</h4>
        <ul>
            <li><a href="https://www.coursera.org/learn/machine-learning" target="_blank">Machine Learning by Andrew Ng (Coursera)</a></li>
            <li><a href="https://www.udemy.com/course/data-science-and-machine-learning-bootcamp-with-r/" target="_blank">Data Science and Machine Learning Bootcamp with R (Udemy)</a></li>
            <li><a href="https://www.edx.org/course/data-science-microMasters" target="_blank">Data Science MicroMasters by UC San Diego (edX)</a></li>
        </ul>
    `;
    
    mainContent.innerHTML += recommendationsHtml;
}
