const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    cookId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cook',
      required: true,
    },
    planType: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true,
    },
    mealsPerDay: Number,
    mealTypes: [String], // breakfast, lunch, dinner
    mealDishes: [
      {
        date: Date,
        dishes: [String],
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalCost: Number,
    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled', 'completed'],
      default: 'active',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    deliveryDays: [String],
    specialRequirements: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
