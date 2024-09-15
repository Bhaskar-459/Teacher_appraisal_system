const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/teacherAppraisal', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

module.exports = { dbConnection };
