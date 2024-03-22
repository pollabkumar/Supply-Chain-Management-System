const express = require("express");
const {
  getMenufController,
  addMenufController,
  editMenufController,
  deleteMenufController,
} = require("./../controllers/menufController");

const router = express.Router();

router.get("/get-Menuf", getMenufController);

router.post("/add-Menuf", addMenufController);

router.put("/edit-Menuf", editMenufController);

router.post("/delete-Menuf", deleteMenufController);

module.exports = router;
