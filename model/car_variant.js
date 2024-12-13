const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection"); // Sequelize instance
const Model = require("./car_model");

const car_variant = sequelize.define("car_variant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  car_modelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Model,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});
module.exports = car_variant;
