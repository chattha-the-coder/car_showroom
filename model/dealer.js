// models/Dealer.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");
const User = require("./user_credential_table");

// const { DataTypes, Model } = require("sequelize");a

const Dealer = sequelize.define("Dealer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userCredentialId: {
    type: DataTypes.INTEGER,
    allowNull: false, // This ensures every Dealer must be linked to a UserCredential
    references: {
      model: User,
      key: "id",
    },
  },
  // Additional fields specific to the dealer
});

module.exports = Dealer;
