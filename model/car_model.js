

const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const car_company = require("./car_company");

const Model = sequelize.define("Model", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  car_companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: car_company,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});
module.exports = Model;
