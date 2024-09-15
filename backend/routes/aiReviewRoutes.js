const express = require('express');
const router = express.Router();
const { aiReview } = require('../controllers/aiReviewController');

router.post('/start', aiReview);

module.exports = router;
