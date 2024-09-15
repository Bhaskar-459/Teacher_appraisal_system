const mongoose = require('mongoose');

// Schema for storing KPA-related data
const kpaSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // KPA 1: Teaching
    teaching: {
        feedback: { type: Number, default: 0 },
        availability: { type: Number, default: 0 },
        mentorship: { type: Number, default: 0 },
        innovation: { type: Number, default: 0 },
        syllabus: { type: Number, default: 0 },
        curriculum: { type: Number, default: 0 },
        objectives: { type: Number, default: 0 },
        averageScore: { type: Number }
    },

    // KPA 2: Professional Development
    professionalDevelopment: {
        publications: [
            {
                doi: String,
                title: String,
                theme: String,
                pageNumber: String,
            }
        ],
        score: { type: Number, default: 9 }
    },

    // KPA 3: Administrative Support / Additional Responsibilities
    administrativeSupport: {
        events: [
            {
                eventName: String,
                involvement: String,
                contribution: String,
                duration: String
            }
        ],
        seminars: [
            {
                seminarName: String,
                theme: String,
                type: String,
                date: Date
            }
        ],
        score: { type: Number, default: 9.3 }
    },

    // KPA 4: Others
    others: {
        professionalDevelopment: { type: Number, default: 0 },
        workDiary: { type: Number, default: 0 },
        punctuality: { type: Number, default: 0 },
        collaborativeWorking: { type: Number, default: 0 },
        averageScore: { type: Number }
    },

    // Final score of all KPAs
    finalScore: { type: Number }
});

module.exports = mongoose.model('KPA', kpaSchema);
