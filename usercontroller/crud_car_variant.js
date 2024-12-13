const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");
const Model = require("../model/car_model");
const car_variant = require("../model/car_variant");

const add_variant = async (req, res) => {
  try {
    const { id, name } = req.body;
    // console.log(car_modelID, ">>>>>>>>>>>>>", name);

    const car_model = await Model.findOne({
      where: {
        id,
      },
    });
    console.log(car_model, " omodel");

    if (!car_model) {
      return res.status(404).json({ message: "car Model not found" });
    }

    // const variant = await car_variant.create({
    //   name,
    //   car_modelID,
    // });
    res.status(201).json({
      message: "car_variant created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating car_variant  -->>>>",
      error: error.message,
    });
  }
};

module.exports = { add_variant };
