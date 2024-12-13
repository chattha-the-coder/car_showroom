const car_company = require("../model/car_company");

// Create a new car company
const createcar_company = async (req, res) => {
  try {
    const { name } = req.body;

    const carcompany = await car_company.create({ name });

    res.status(201).json({
      message: "Car Company created successfully",
      carcompany,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Car Company", error: error.message });
  }
};

// Get all car companies
const getAllCarCompanies = async (req, res) => {
  try {
    const carCompanies = await car_company.findAll();
    res.status(200).json(carCompanies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Car Companies", error: error.message });
  }
};

// Get a single car company by ID
const getcar_companyById = async (req, res) => {
  try {
    const { id } = req.params;
    const carcompany = await car_company.findByPk(id);

    if (!carcompany) {
      return res.status(404).json({ message: "Car Company not found" });
    }

    res.status(200).json(carcompany);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Car Company", error: error.message });
  }
};

// Update a car company by ID
const updatecar_company = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const carcompany = await car_company.findByPk(id);

    if (!carcompany) {
      return res.status(404).json({ message: "Car Company not found" });
    }

    carcompany.name = name;
    await carcompany.save();

    res
      .status(200)
      .json({ message: "Car Company updated successfully", carcompany });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Car Company", error: error.message });
  }
};

// Delete a car company by ID
const deletecar_company = async (req, res) => {
  try {
    const { id } = req.params;

    const carcompany = await car_company.findByPk(id);

    if (!car_company) {
      return res.status(404).json({ message: "Car Company not found" });
    }

    await carcompany.destroy();

    res.status(200).json({ message: "Car Company deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Car Company", error: error.message });
  }
};

module.exports = {
  createcar_company,
  getAllCarCompanies,
  getcar_companyById,
  updatecar_company,
  deletecar_company,
};
