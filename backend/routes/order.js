const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders
} = require('../controllers/orderController');

router.post('/', placeOrder); // Place an order
router.get('/:userId', getUserOrders); // Get all orders for a user

module.exports = router;
