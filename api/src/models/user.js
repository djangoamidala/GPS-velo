const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database');
require('dotenv').config();

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'subscriber', 'admin'),
    defaultValue: 'user',  
  },
   resetToken: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  resetTokenExpiry: {
    type: DataTypes.DATE,
    defaultValue: null
  }
});

module.exports = User;
