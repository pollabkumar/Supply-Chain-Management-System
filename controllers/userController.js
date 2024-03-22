const userModal = require("../models/userModel");
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(400).json({ error: "Plz filled the data" });
    }
    const userLogin = await userModal.findOne({ userId: userId });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credintial pass" });
      } else {
        res.json({ message: "Login Successfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credintial" });
    }
  } catch (err) {
    console.log(err);
  }
};

//register

const registerController = async (req, res) => {
  const { name, userId, password } = req.body;
  if (!name || !userId || !password) {
    return res.status(422).json({ error: "Plz fill the field correctly" });
  }
  try {
    const userExist = await userModal.findOne({ userId: userId });
    if (userExist) {
      return res.status(422).json({ error: "userId already Exist" });
    } else {
      const user = new userModal({ name, userId, password });
      await user.save();
    }
    res.status(201).json({ message: "user register successful" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loginController,
  registerController,
};
