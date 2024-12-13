const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const UserCredential = require("../model/user_credential_table");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(bodyParser.json());

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ message: "Username ,password and role are required." });
    }

    if (role != "admin" && role != "dealer") {
      return res.status(400).json({
        message: "error : you can only register for admin or dealer role",
      });
    }
    console.log(username);
    const existingUser = await UserCredential.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserCredential.create({
      username,
      password,
      hash_password: hashedPassword,
      role,
    });
    res.status(201).json({
      message: "User registered successfully!",
      UserCredential: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username , password and role are required." });
    }

    const user = await UserCredential.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password." });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Login successful , token IS below  ", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { register, login };
