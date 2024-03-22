const menufModel = require("../models/menufModel");

const getMenufController = async (req, res) => {
  try {
    const menuf = await menufModel.find();
    res.status(200).send(menuf);
  } catch (error) {
    console.log(error);
  }
};

const addMenufController = async (req, res) => {
  try {
    const newMenuf = new menufModel(req.body);
    await newMenuf.save();
    res.status(201).send("Item Created Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const editMenufController = async (req, res) => {
  try {
    await menufModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("Item updated");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const deleteMenufController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await menufModel.findOneAndDelete({ _id: itemId });
    res.status(200).send("Item delete");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};
module.exports = {
  getMenufController,
  addMenufController,
  editMenufController,
  deleteMenufController,
};
