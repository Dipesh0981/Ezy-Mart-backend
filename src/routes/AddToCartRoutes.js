const express = require('express');
const router = express.Router();
const addToCartController = require('../controllers/AddToCartController');

router.post('/add', addToCartController.addToCart);
router.get('/:userId', addToCartController.getCart);
router.post('/remove', addToCartController.removeFromCart);
router.post('/update', addToCartController.updateQuantity);

module.exports = router;
