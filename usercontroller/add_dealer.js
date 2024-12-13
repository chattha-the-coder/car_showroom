const Dealer = require("../model/dealer");
const User = require("../model/user_credential_table");
const createDealer = async (req, res) => {
  const { username, dealerName, contact } = req.body;

  try {
    const credential = await User.findOne({ where: { username } });
    
    if (!credential) {
      return res
        .status(403)
        .json({ message: "Username does not exist in the user table" });
    }


    if (credential.role === "admin") {
      return res
        .status(403)
        .json({ message: "Only Dealer data can be saved " });
    }
    const dealer = await Dealer.create({
      name: dealerName,
      contact,
      userCredentialId: credential.id,
    });

    res.status(200).json("Dealer added successfully ");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating dealer." });
  }
};

module.exports = { createDealer };
