const express = require("express");
const {
  addreController,
  getreController,
  deletereController,
  editreController,
} = require("./../controllers/reController");

const router = express.Router();

router.post("/add-re", addreController);

router.get("/get-re", getreController);

router.put("/edit-re", editreController);

router.post("/delete-re", deletereController);

module.exports = router;
