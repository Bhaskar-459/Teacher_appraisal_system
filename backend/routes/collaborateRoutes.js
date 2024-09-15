const express = require('express');
const router = express.Router();
const { collaborateController } = require('../controllers/collaborateController');

router.post('/start', collaborateController);

module.exports = router;
