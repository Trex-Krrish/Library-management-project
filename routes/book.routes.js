const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const adminAuth = require('../middleware/adminAuth')

router.post('/', adminAuth, bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', adminAuth, bookController.updateBookById);
router.delete('/:id', adminAuth, bookController.deleteBookById);

module.exports = router;