const KPA = require('../models/KPA');
const User = require('../models/User');



exports.saveAllKpas = async (req, res) => {
    const { teacherId, kpaData } = req.body; 
    let id = parseInt(teacherId);
    // console.log('Received KPA data:', kpaData);

    try {
        // Find the teacher by their institutionId
        const teacher = await User.findOne({ institutionId: id });

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Find the KPA data associated with the teacher
        let kpa = await KPA.findOne({ teacherId: teacher._id });

        // Ensure proper data parsing for seminars and events
        if (kpaData.administrativeSupport && kpaData.administrativeSupport.seminars) {
            kpaData.administrativeSupport.seminars = kpaData.administrativeSupport.seminars.map(seminar => ({
                seminarName: seminar.seminarName,
                theme: seminar.theme,
                type: seminar.type,
                date: new Date(seminar.date) // Ensure proper date format
            }));
        }

        if (kpaData.administrativeSupport && kpaData.administrativeSupport.events) {
            kpaData.administrativeSupport.events = kpaData.administrativeSupport.events.map(event => ({
                eventName: event.eventName,
                involvement: event.involvement,
                contribution: event.contribution,
                duration: event.duration
            }));
        }

        // Handle publications inside professionalDevelopment
        if (kpaData.professionalDevelopment && kpaData.professionalDevelopment.publications) {
            kpaData.professionalDevelopment.publications = kpaData.professionalDevelopment.publications.map(pub => ({
                name: pub.name,
                theme: pub.theme,
                pageNumber: pub.pageNumber
            }));
        }

        if (!kpa) {
            // If no KPA exists, create a new one
            kpa = new KPA({
                teacherId: teacher._id, // Save the teacher's _id reference
                kpaData: {
                    teaching: kpaData.teaching,
                    professionalDevelopment: kpaData.professionalDevelopment,
                    administrativeSupport: kpaData.administrativeSupport,
                    others: kpaData.others,
                    finalScore :kpaData.finalScore
                }
            });
        } else {
            // Update the existing KPA data
            kpa.kpaData.teaching = { ...kpa.kpaData.teaching, ...kpaData.teaching };
            kpa.kpaData.professionalDevelopment = { ...kpa.kpaData.professionalDevelopment, ...kpaData.professionalDevelopment };
            kpa.kpaData.administrativeSupport = { ...kpa.kpaData.administrativeSupport, ...kpaData.administrativeSupport };
            kpa.kpaData.others = { ...kpa.kpaData.others, ...kpaData.others };
            kpa.kpaData.finalScore = kpaData.finalScore;
        }

        // Save the new or updated KPA data to the database
        await kpa.save();
        res.status(200).json({ message: 'KPA data saved successfully' });

    } catch (error) {
        console.error('Error saving KPA data:', error.message);
        res.status(500).json({ message: 'Error saving KPA data', error: error.message });
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



