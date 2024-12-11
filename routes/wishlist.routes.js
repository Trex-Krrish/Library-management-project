const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.post('/add', wishlistController.addToWishlist);
router.delete('/remove', wishlistController.removefromWishlist);
router.get('/', wishlistController.getWishlist);

module.exports = router;