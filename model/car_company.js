

const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");


const car_company = sequelize.define("car_company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = car_company;