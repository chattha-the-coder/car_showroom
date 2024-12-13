const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");
const Model = require("../model/car_model");
const car_company = require("../model/car_company");

// Create a new Model for a car company
const createModel = async (req, res) => {
  try {
    const { car_companyId, name } = req.body;

    // Check if the car company exists
    const carcompany = await car_company.findByPk(car_companyId);
    if (!carcompany) {
      return res.status(404).json({ message: "Car Company not found" });
    }

    const Modell = await Model.create({ name, car_companyId });

    res.status(201).json({
      message: "Model created successfully and assigned to car company"
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Model", error: error.message });
  }
};

// Get all Models
const getAllModels = async (req, res) => {
  try {
    const Models = await Model.findAll({ include: car_company });
    res.status(200).json(Models);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Models", error: error.message });
  }
};

// Get a single Model by ID
const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const Modell = await Model.findByPk(id);

    if (!Modell) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.status(200).json(Modell);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Model", error: error.message });
  }
};

// Update a Model by ID
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const Modell = await Model.findByPk(id);

    if (!Modell) {
      return res.status(404).json({ message: "Model not found" });
    }

    Modell.name = name;
    // console.log(Modell.name);
    await Modell.save();

    res.status(200).json({ message: "Model updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Model", error: error.message });
  }
};

// Delete a Model by ID
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const Modell = await Model.findByPk(id);

    if (!Modell) {
      return res.status(404).json({ message: "Model not found" });
    }

    await Modell.destroy();

    res.status(200).json({ message: "Model deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Model", error: error.message });
  }
};

module.exports = {
  createModel,
  getAllModels,
  getModelById,
  updateModel,
  deleteModel,
};
