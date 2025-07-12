const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order');
const Product = require('./product');

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = OrderItem;
