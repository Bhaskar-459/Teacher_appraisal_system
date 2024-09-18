document.addEventListener('DOMContentLoaded', () => {
    const startAIReviewButton = document.getElementById('startAIReview');
    const loadingScreen = document.getElementById('loadingScreen');
    const kpaTableContainer = document.getElementById('kpaTableContainer');
    const recommendationsContainer = document.getElementById('recommendations');

    startAIReviewButton.addEventListener('click', () => {
        // Show loading screen
        loadingScreen.style.display = 'flex';

        // Simulate a delay (e.g., 2 seconds) before loading data
        setTimeout(() => {
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

            // Hide loading screen
            loadingScreen.style.display = 'none';

            // Display KPA Data
            displayKPAData(kpaData);
            
            // Display Recommendations
            displayRecommendations();
        }, 2000); // 2-second delay
    });

    function displayKPAData(kpaData) {
        let kpaTableHtml = '<table><thead><tr><th>Category</th><th>Subcategory</th><th>Value</th></tr></thead><tbody>';
        
        for (const [category, subcategories] of Object.entries(kpaData)) {
            for (const [subcategory, value] of Object.entries(subcategories)) {
                kpaTableHtml += `<tr><td>${category}</td><td>${subcategory}</td><td>${value}</td></tr>`;
            }
        }
        
        kpaTableHtml += '</tbody></table>';
        
        kpaTableContainer.innerHTML = kpaTableHtml;
        kpaTableContainer.style.display = 'flex';  // Show the table container
    }

    function displayRecommendations() {
        let recommendationsHtml = `
            <h3>Recommended Reading & Courses</h3>
            <h4>Books on Blockchain:</h4>
            <ul>
                <li><a href="https://www.amazon.com/dp/1492053247" target="_blank">Mastering Blockchain by Imran Bashir</a></li>
                <li><a href="https://www.amazon.com/dp/1800565976" target="_blank">Blockchain Basics by Daniel Drescher</a></li>
                <li><a href="https://www.amazon.com/dp/0071835528" target="_blank">Blockchain Revolution by Don Tapscott & Alex Tapscott</a></li>
            </ul>
            <h4>Online Courses:</h4>
            <ul>
                <li><a href="https://www.coursera.org/specializations/blockchain" target="_blank">Blockchain Specialization by Coursera</a></li>
                <li><a href="https://www.udemy.com/course/blockchain-and-cryptocurrency-explained/" target="_blank">Blockchain and Cryptocurrency Explained by Udemy</a></li>
                <li><a href="https://www.edx.org/learn/blockchain" target="_blank">Blockchain Fundamentals by edX</a></li>
            </ul>
        `;

        recommendationsContainer.innerHTML = recommendationsHtml;
        recommendationsContainer.style.display = 'block';  // Show the recommendations
    }
});
