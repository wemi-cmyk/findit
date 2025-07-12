const express = require('express');
const router = express.Router();
const {
  addToCart,
  getUserCart,
  removeFromCart
} = require('../controllers/cartController');

router.post('/', addToCart); // Add to cart
router.get('/:userId', getUserCart); // Get user cart
router.delete('/:cartId', removeFromCart); // Remove item

module.exports = router;
