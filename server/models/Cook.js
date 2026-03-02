const mongoose = require('mongoose');

const cookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    businessName: {
      type: String,
      required: [true, 'Please add business name'],
    },
    cuisineType: [
      {
        type: String,
        enum: ['North Indian', 'South Indian', 'Chinese', 'Continental', 'Vegetarian', 'Vegan'],
      },
    ],
    serviceArea: {
      type: String,
      required: true,
    },
    mealTypes: {
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false },
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    maxPrice: {
      type: Number,
      default: 500,
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    documents: {
      fssaiLicense: String,
      idProof: String,
    },
    availableDays: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model('Cook', cookSchema);
