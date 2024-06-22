const mongoose = require("mongoose");

const menuTypeSchema = new mongoose.Schema({
  nonVeg: Boolean,
  veg: Boolean,
  party: Boolean,
  coffee: Boolean,
  dinner: Boolean,
  lunch: Boolean,
  breakfast: Boolean,
});

const variantSchema = new mongoose.Schema({
  name: String,
  variantName: String,
  price: String,
  quantity: String,
});

const groupItemSchema = new mongoose.Schema({
  category: String,
  foodName: String,
  components: String,
  notes: String,
  description: String,
  vat: String,
  offer: Boolean,
  special: Boolean,
  cookingTime: String,
  status: String,
  menuType: menuTypeSchema,
  variants: [variantSchema],
});

const GroupItem = mongoose.model("GroupItem", groupItemSchema);

module.exports = GroupItem;
