const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const existingItem = await Cart.findOne({
      where: { userId, productId }
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "Cart updated", cart: existingItem });
    }

    const cart = await Cart.create({ userId, productId, quantity });
    res.status(201).json({ message: "Added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// Get user's cart
exports.getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [Product]
    });
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    await Cart.destroy({ where: { id: cartId } });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
