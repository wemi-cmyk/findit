const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
