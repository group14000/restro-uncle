const GroupItem = require("../models/groupItem");

exports.createGroupItem = async (req, res) => {
  try {
    const newItem = new GroupItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding group item", error });
  }
};

exports.getGroupItem = async (req, res) => {
  try {
    const groupItems = await GroupItem.find();
    res.status(200).json(groupItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
