const express = require("express");
const router = express.Router();
const {
  createGroupItem,
  getGroupItem,
} = require("../controller/groupItemController");

router.post("/group-items", createGroupItem);
router.get("/group-items-list", getGroupItem);

module.exports = router;
