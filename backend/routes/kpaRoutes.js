const express = require('express');
const router = express.Router();
const {
    saveTeachingKPA,
    saveProfessionalDevelopmentKPA,
    saveAdministrativeSupportKPA,
    saveOthersKPA,
    calculateFinalScore,
    getKPA
} = require('../controllers/kpaController');

// Routes for KPA 1 (Teaching)
router.post('/saveTeachingKPA', saveTeachingKPA);

// Routes for KPA 2 (Professional Development)
router.post('/saveProfessionalDevelopmentKPA', saveProfessionalDevelopmentKPA);

// Routes for KPA 3 (Administrative Support)
router.post('/saveAdministrativeSupportKPA', saveAdministrativeSupportKPA);

// Routes for KPA 4 (Others)
router.post('/saveOthersKPA', saveOthersKPA);

// Calculate the final score across all KPAs
router.post('/calculateFinalScore', calculateFinalScore);

// Fetch KPA details for a teacher
router.get('/getKPA/:teacherId', getKPA);

module.exports = router;
