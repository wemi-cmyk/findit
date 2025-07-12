const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const Product = require('./models/product');
const productRoutes = require('./routes/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const cartRoutes = require('./routes/cart');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');
const orderRoutes = require('./routes/order');

//Load environment variables

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


// Sync DB and start server
sequelize.sync().then(() => {
  console.log("DB connected & synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to DB:", err);
});
