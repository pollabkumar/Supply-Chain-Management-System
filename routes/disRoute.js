const express = require("express");
const {
  addDisController,
  getDisController,
  deleteDisController,
  editDisController,
} = require("./../controllers/disController");

const router = express.Router();

router.post("/add-dis", addDisController);

router.get("/get-dis", getDisController);

router.put("/edit-dis", editDisController);

router.post("/delete-dis", deleteDisController);

module.exports = router;
