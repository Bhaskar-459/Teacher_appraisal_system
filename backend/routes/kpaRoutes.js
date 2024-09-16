const express = require('express');
const router = express.Router();
const {saveAllKpas ,getKPA ,getAllKPA } = require('../controllers/kpaController');


// Save KPA details for a teacher
router.post('/saveAllKPAs', saveAllKpas);

// Fetch KPA details for a teacher
router.get('/getKPA/:teacherId', getKPA);

// get all KPA details
router.get('/getAllKPA', getAllKPA);

module.exports = router;
