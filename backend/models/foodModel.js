const mongoose = require("mongoose");

const MenuTypeSchema = new mongoose.Schema({
  nonVeg: { type: Boolean, default: false },
  veg: { type: Boolean, default: false },
  party: { type: Boolean, default: false },
  coffee: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
  lunch: { type: Boolean, default: false },
  breakfast: { type: Boolean, default: false },
});

const FoodSchema = new mongoose.Schema({
  category: { type: String, required: true },
  kitchen: { type: String, required: true },
  foodName: { type: String, required: true },
  components: { type: String },
  notes: { type: String },
  description: { type: String },
  image: { type: String },
  vat: { type: String },
  offer: { type: Boolean, default: false },
  special: { type: Boolean, default: false },
  customQuantity: { type: Boolean, default: false },
  cookingTime: { type: String },
  menuType: { type: MenuTypeSchema, default: () => ({}) },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("Food", FoodSchema);
