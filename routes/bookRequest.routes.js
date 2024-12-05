const express = require('express');
const router = express.Router();
const bookRequestController = require('../controllers/bookRequest.controller'); 
const userAuth = require('../middleware/userAuth'); 
const adminAuth = require('../middleware/adminAuth'); 

router.post('/', userAuth, bookRequestController.createBookRequest);
router.get('/', adminAuth, bookRequestController.getAllBookRequests);
router.get('/:id', adminAuth, bookRequestController.getBookRequestById);
router.put('/:id', adminAuth, bookRequestController.updateBookRequestStatus);
router.delete('/:id', adminAuth, bookRequestController.deleteBookRequest);

module.exports = router;