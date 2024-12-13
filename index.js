const verifyToken = require("./middleware/jwt_verify");
const express = require("express");
const bodyParser = require("body-parser");
const {
  sequelize,
  authenticateDatabase,
  syncDatabase,
} = require("./connection.js");

const {
  createcar_company,
  getAllCarCompanies,
  getcar_companyById,
  updatecar_company,
  deletecar_company,
} = require("./usercontroller/crud_car_company.js");

const User = require("./model/user_credential_table.js");
const Dealer = require("./model/dealer.js");
const car_company = require("./model/car_company");
const Model = require("./model/car_model");

require("dotenv").config();
const userctrl = require("./usercontroller/usercontroller.js");
const add_dealer = require("./usercontroller/add_dealer.js");
const {
  createModel,
  getAllModels,
  getModelById,
  updateModel,
  deleteModel,
} = require("./usercontroller/crud_car_model.js");

const car_variant = require("./model/car_variant.js");
const { add_variant } = require("./usercontroller/crud_car_variant.js");

const app = express();
app.use(bodyParser.json());

authenticateDatabase();
syncDatabase();

app.post("/register", userctrl.register);
app.post("/login", userctrl.login);

app.post("/add_dealer", verifyToken("/add_dealer"), add_dealer.createDealer);

app.post(
  "/add_car_company",
  verifyToken("/add_car_company"),
  createcar_company
);
app.post(
  "/allcarcompanies",
  verifyToken("/allcarcompanies"),
  getAllCarCompanies
);
app.post(
  "/getcar_companyById/:id",
  verifyToken("/getcar_companyById"),
  getcar_companyById
);
app.post(
  "/update_car_company_name/:id",
  verifyToken("/update_car_company_name"),
  updatecar_company
);
app.post(
  "/delete_car_company/:id",
  verifyToken("/delete_car_company"),
  deletecar_company
);

app.post("/add_model", verifyToken("/add_model"), createModel);
app.post("/getAllModels", verifyToken("/getAllModels"), getAllModels);
app.post("/getModelById/:id", verifyToken("/getModelById"), getModelById);
app.post("/updateModel/:id", verifyToken("/updateModel"), updateModel);
app.post("/deleteModel/:id", verifyToken("/deleteModel"), deleteModel);

app.post("/add_variant", verifyToken("/add_variant"), add_variant);

// createModel,
//   getAllModels,
//   getModelById,
//   updateModel,
//   deleteModel,

// app.get("/secure", verifyToken("/secure"), (req, res) => {
//   res.status(200).json({ message: "this route is accessed successfully " });
// });

// Relationships of tables
User.hasOne(Dealer);
Dealer.belongsTo(User);

Dealer.belongsToMany(car_company, {
  through: "DealerCarCompanies", // Name of the intermediate table
  foreignKey: "dealerId",
  otherKey: "car_companyId",
});
car_company.belongsToMany(Dealer, {
  through: "DealerCarCompanies", // Name of the intermediate table
  foreignKey: "car_companyId",
  otherKey: "dealerId",
});

car_company.hasMany(Model, { foreignKey: "car_companyId" });
Model.belongsTo(car_company);

Model.hasMany(car_variant, {
  foreignKey: "modelId",
});
car_variant.belongsTo(Model);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
