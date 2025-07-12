const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Product = require('./product');

const Cart = sequelize.define('Cart', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Relationships
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart;
