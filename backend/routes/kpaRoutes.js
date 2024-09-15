const express = require('express');
const router = express.Router();
const {saveAllKpas ,getKPA} = require('../controllers/kpaController');


// Save KPA details for a teacher
router.post('/saveAllKPAs', saveAllKpas);

// Fetch KPA details for a teacher
router.get('/getKPA/:teacherId', getKPA);

module.exports = router;
