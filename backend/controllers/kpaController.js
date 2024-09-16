const KPA = require('../models/KPA');
const User = require('../models/User');
exports.saveAllKpas = async (req, res) => {
    const { teacherId, kpaData } = req.body; 
    let id = parseInt(teacherId);
    
    try {
        // Find the teacher by their institutionId
        const teacher = await User.findOne({ institutionId: id });
        
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Find the KPA data associated with the teacher
        let kpa = await KPA.findOne({ teacherId: teacher._id });
        
        if (!kpa) {
            // If no KPA exists, create a new one
            kpa = new KPA({
                teacherId: teacher._id, // Save the teacher's _id reference
                teaching: kpaData.teaching,
                professionalDevelopment: kpaData.professionalDevelopment,
                administrativeSupport: kpaData.administrativeSupport,
                others: kpaData.others,
                finalScore: kpaData.finalScore
            });
        } else {
            // Update the existing KPA data
            kpa.teaching = kpaData.teaching || kpa.teaching;
            kpa.professionalDevelopment = kpaData.professionalDevelopment || kpa.professionalDevelopment;
            kpa.administrativeSupport = kpaData.administrativeSupport || kpa.administrativeSupport;
            kpa.others = kpaData.others || kpa.others;
            kpa.finalScore = kpaData.finalScore || kpa.finalScore;
        }
        
        // Save the new or updated KPA data to the database
        await kpa.save();
        res.status(200).json({ message: 'KPA data saved successfully' });
        
    } catch (error) {
        console.error('Error saving KPA data:', error);
        res.status(500).json({ message: 'Error saving KPA data', error });
    }
};



// Fetch KPA Data (for reviewing or displaying)
exports.getKPA = async (req, res) => {
    const { teacherId } = req.params;

    try {
        const kpa = await KPA.findOne({ teacherId });
        if (!kpa) {
            return res.status(404).json({ message: 'KPA not found' });
        }
        res.status(200).json(kpa);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching KPA', error });
    }
};

// Fetch all KPA Data
exports.getAllKPA = async (req, res) => {
    try {
        const kpa = await KPA.find().populate('teacherId'); // Adjust fields as per your User schema
        
        // Check if KPA data exists
        if (!kpa || kpa.length === 0) {
            return res.status(404).json({ message: 'KPA data not found' });
        }

        // Format the response with teacher and KPA data
        const kpaData = kpa.map(item => {
            return {
                teacherId: item.teacherId.institutionId, // Use institutionId as teacher ID
                teacherName: item.teacherId.username,
                teaching: item.teaching.averageScore || 0,
                professionalDevelopment: item.professionalDevelopment.score || 0,
                administrativeSupport: item.administrativeSupport.score || 0,
                others: item.others.averageScore || 0,
                finalScore: item.finalScore || 0
            };
        });

        // Send the array of KPA data as the response
        res.status(200).json(kpaData);
    } catch (error) {
        console.error('Error fetching KPA data:', error);
        res.status(500).json({ message: 'Error fetching KPA data', error });
    }
};



