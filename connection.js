const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("The table has been created successfully.");
  } catch (error) {
    console.error("Error creating the table:", error);
  }
}

// Export sequelize instance and functions
module.exports = { sequelize, authenticateDatabase, syncDatabase };
