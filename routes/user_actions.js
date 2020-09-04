const express = require('express');
const actionController = require('../controllers/user_actions.js');

const router = express.Router();

router.use('/edit_profile', actionController.edit);

module.exports = router;
