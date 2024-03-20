const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index'); 

const User = sequelize.define('users', {

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
},
login: {
    type: DataTypes.STRING,
    allowNull: true,
},  
senha:{
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;