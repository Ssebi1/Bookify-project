const express = require('express');
const actionController = require('../controllers/book_actions.js');

const router = express.Router();

router.use('/delete', actionController.delete);
router.use('/save_notes', actionController.saveNotes);
router.use('/edit_book', actionController.editBook);


module.exports = router;
