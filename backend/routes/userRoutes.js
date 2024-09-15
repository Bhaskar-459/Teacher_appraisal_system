const express = require('express');
const router = express.Router();

const { getUsers} = require('../controllers/userController');

router.get('/getAll', getUsers);

module.exports = router;



