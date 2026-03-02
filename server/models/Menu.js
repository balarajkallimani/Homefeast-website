const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    cookId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cook',
      required: true,
    },
    dishName: {
      type: String,
      required: [true, 'Please add dish name'],
    },
    description: String,
    price: {
      type: Number,
      required: [true, 'Please add price'],
    },
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      required: true,
    },
    cuisineType: String,
    isVegetarian: {
      type: Boolean,
      default: true,
    },
    servingSize: String,
    ingredients: [String],
    image: String,
    availability: {
      monday: { type: Boolean, default: false },
      tuesday: { type: Boolean, default: false },
      wednesday: { type: Boolean, default: false },
      thursday: { type: Boolean, default: false },
      friday: { type: Boolean, default: false },
      saturday: { type: Boolean, default: false },
      sunday: { type: Boolean, default: false },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model('Menu', menuSchema);
