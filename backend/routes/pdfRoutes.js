const express = require('express');
const router = express.Router();

const { generatePDF } = require('../controllers/pdfController');

// Generate PDF
router.post('/generatePdf/:id', generatePDF);

module.exports = router;