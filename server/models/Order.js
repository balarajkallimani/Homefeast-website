const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
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
    items: [
      {
        menuId: mongoose.Schema.ObjectId,
        dishName: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: Date,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending',
    },
    deliveryAddress: String,
    specialInstructions: String,
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    rating: Number,
    review: String,
  }
);

module.exports = mongoose.model('Order', orderSchema);
