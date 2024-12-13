const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");
// const Dealer = require("./dealer.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["admin", "dealer"]],
      },
    },
  },

  {
    tableName: "User",
  }
);

module.exports = User;
