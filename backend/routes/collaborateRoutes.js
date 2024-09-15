const express = require('express');
const router = express.Router();
const { collaborate } = require('../controllers/collaborateController');

router.post('/start', collaborate);

module.exports = router;
