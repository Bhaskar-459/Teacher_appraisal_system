const KPA = require('../models/KPA');

// Save Teaching KPA (KPA 1)
exports.saveTeachingKPA = async (req, res) => {
    const { teacherId, feedback, availability, mentorship, innovation, syllabus, curriculum, objectives } = req.body;

    try {
        const averageScore = (feedback + availability + mentorship + innovation + syllabus + curriculum + objectives) / 7;

        const kpa = await KPA.findOneAndUpdate(
            { teacherId },
            { $set: { 
                teaching: { feedback, availability, mentorship, innovation, syllabus, curriculum, objectives, averageScore }
            } },
            { new: true, upsert: true }
        );
        res.status(201).json({ message: 'Teaching KPA saved successfully', kpa });
    } catch (error) {
        res.status(500).json({ message: 'Error saving Teaching KPA', error });
    }
};

// Save Professional Development KPA (KPA 2)
exports.saveProfessionalDevelopmentKPA = async (req, res) => {
    const { teacherId, publications } = req.body;

    try {
        const kpa = await KPA.findOneAndUpdate(
            { teacherId },
            { $set: { professionalDevelopment: { publications, score: 9 } } },
            { new: true, upsert: true }
        );
        res.status(201).json({ message: 'Professional Development KPA saved successfully', kpa });
    } catch (error) {
        res.status(500).json({ message: 'Error saving Professional Development KPA', error });
    }
};

// Save Administrative Support KPA (KPA 3)
exports.saveAdministrativeSupportKPA = async (req, res) => {
    const { teacherId, events, seminars } = req.body;

    try {
        const kpa = await KPA.findOneAndUpdate(
            { teacherId },
            { $set: { administrativeSupport: { events, seminars, score: 9.3 } } },
            { new: true, upsert: true }
        );
        res.status(201).json({ message: 'Administrative Support KPA saved successfully', kpa });
    } catch (error) {
        res.status(500).json({ message: 'Error saving Administrative Support KPA', error });
    }
};

// Save Others KPA (KPA 4)
exports.saveOthersKPA = async (req, res) => {
    const { teacherId, professionalDevelopment, workDiary, punctuality, collaborativeWorking } = req.body;

    try {
        const averageScore = (professionalDevelopment + workDiary + punctuality + collaborativeWorking) / 4;

        const kpa = await KPA.findOneAndUpdate(
            { teacherId },
            { $set: { others: { professionalDevelopment, workDiary, punctuality, collaborativeWorking, averageScore } } },
            { new: true, upsert: true }
        );
        res.status(201).json({ message: 'Others KPA saved successfully', kpa });
    } catch (error) {
        res.status(500).json({ message: 'Error saving Others KPA', error });
    }
};

// Final Score Calculation
exports.calculateFinalScore = async (req, res) => {
    const { teacherId } = req.body;

    try {
        const kpa = await KPA.findOne({ teacherId });

        if (!kpa) {
            return res.status(404).json({ message: 'KPA not found' });
        }

        const { teaching, professionalDevelopment, administrativeSupport, others } = kpa;

        const finalScore = (teaching.averageScore + professionalDevelopment.score + administrativeSupport.score + others.averageScore) / 4;

        kpa.finalScore = finalScore;
        await kpa.save();

        res.status(200).json({ message: 'Final score calculated successfully', finalScore });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating final score', error });
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
