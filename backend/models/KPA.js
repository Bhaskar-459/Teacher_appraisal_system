const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    theme: { type: String, required: true },
    pageNumber: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    involvement: { type: String, required: true },
    contribution: { type: String, required: true },
    duration: { type: String, required: true }
});

const seminarSchema = new mongoose.Schema({
    seminarName: { type: String, required: true },
    theme: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true }
});

const teachingSchema = new mongoose.Schema({
    feedback: { type: String, required: true },
    availability: { type: String, required: true },
    mentorship: { type: String, required: true },
    innovation: { type: String, required: true },
    syllabus: { type: String, required: true },
    curriculum: { type: String, required: true },
    objectives: { type: String, required: true },
    teachingScore:{type:Number}
});

const professionalDevelopmentSchema = new mongoose.Schema({
    doi: { type: String, required: true },
    publications: [publicationSchema],
    professionalDevelopmentScore:{type:Number}
});

const administrativeSupportSchema = new mongoose.Schema({
    events: [eventSchema],
    seminars: [seminarSchema],
    administrativeSupportScore:{type:Number}
});

const othersSchema = new mongoose.Schema({
    professionalDevelopment: { type: String, required: true },
    workDiary: { type: String, required: true },
    punctuality: { type: String, required: true },
    collaborativeWorking: { type: String, required: true },
    othersScore:{type:Number}
});

const kpaSchema = new mongoose.Schema({
    teacherId: { type:String, ref: 'User', required: true },
    kpaData: {
        teaching: teachingSchema,
        professionalDevelopment: professionalDevelopmentSchema,
        administrativeSupport: administrativeSupportSchema,
        others: othersSchema,
        finalScore:{type:Number}
    }
});

module.exports = mongoose.model('KPA', kpaSchema);
