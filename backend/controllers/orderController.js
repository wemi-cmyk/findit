const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.placeOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [Product]
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.Product.price;
    }, 0);

    // Create Order
    const order = await Order.create({ userId, total });

    // Create OrderItems
    const orderItems = cartItems.map(item => ({
      OrderId: order.id,
      ProductId: item.Product.id,
      quantity: item.quantity,
      price: item.Product.price
    }));

    await OrderItem.bulkCreate(orderItems);

    // Clear Cart
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ message: "Order placed!", orderId: order.id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order." });
  }
};

exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: {
        model: OrderItem,
        include: [Product]
      }
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};
