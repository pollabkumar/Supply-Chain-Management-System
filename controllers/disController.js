const disModel = require("../models/disModel");

const addDisController = async (req, res) => {
  try {
    const newDis = new disModel(req.body);
    await newDis.save();
    res.send("dis Created Successfully!");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
};

const getDisController = async (req, res) => {
  try {
    const dis = await disModel.find();
    res.send(dis);
  } catch (error) {
    console.log(error);
  }
};

const editDisController = async (req, res) => {
  try {
    await disModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("Item updated");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const deleteDisController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await disModel.findOneAndDelete({ _id: itemId });
    res.status(200).send("Item delete");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};
module.exports = {
  addDisController,
  getDisController,
  deleteDisController,
  editDisController,
};
