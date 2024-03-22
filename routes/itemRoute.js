const express = require("express");
const {
  addItemController,
  getItemController,
  deleteItemController,
  editItemController,
} = require("./../controllers/itemController");

const router = express.Router();

router.post("/add-item", addItemController);

router.get("/get-item", getItemController);

router.put("/edit-item", editItemController);

router.post("/delete-item", deleteItemController);

module.exports = router;
