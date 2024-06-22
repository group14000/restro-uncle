const Food = require("../models/foodModel");

exports.createFood = async (req, res) => {
  try {
    const {
      category,
      kitchen,
      foodName,
      components,
      notes,
      description,
      vat,
      offer,
      special,
      customQuantity,
      cookingTime,
      menuType,
      status,
    } = req.body;
    const image = req.file ? req.file.path : null;

    const food = new Food({
      category,
      kitchen,
      foodName,
      components,
      notes,
      description,
      image,
      vat,
      offer,
      special,
      customQuantity,
      cookingTime,
      menuType,
      status,
    });

    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
