const retailModel = require("../models/retailModel");

const getreController = async (req, res) => {
  try {
    const re = await retailModel.find();
    res.status(200).send(re);
  } catch (error) {
    console.log(error);
  }
};

const addreController = async (req, res) => {
  try {
    const newRe = new retailModel(req.body);
    await newRe.save();
    res.status(201).send("Item Created Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const editreController = async (req, res) => {
  try {
    await retailModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("Item updated");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const deletereController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await retailModel.findOneAndDelete({ _id: itemId });
    res.status(200).send("Item delete");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};
module.exports = {
  addreController,
  getreController,
  deletereController,
  editreController,
};
