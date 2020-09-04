const express = require('express');
const crudController = require('../controllers/crud');

const router = express.Router();

router.post('/create', crudController.create);

module.exports = router;
