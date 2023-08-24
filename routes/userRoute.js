const express = require("express");
const router = express.Router();
const {
  addUser,
  deleteuser,
  updateUser,
  getUser,
} = require("../controller/userController");

router.post("/add", addUser);
router.delete("/delete/:identifier", deleteuser);
router.post("/update/:identifier", updateUser);
router.post("/get/:identifier", getUser);

module.exports =  router
