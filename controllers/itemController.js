const itemModel = require("../models/itemModel");

const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.send("dis Created Successfully!");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
};

const getItemController = async (req, res) => {
  try {
    const item = await itemModel.find();
    res.send(item);
  } catch (error) {
    console.log(error);
  }
};

const editItemController = async (req, res) => {
  try {
    await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("Item updated");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).send("Item delete");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};
module.exports = {
  addItemController,
  getItemController,
  deleteItemController,
  editItemController,
};
