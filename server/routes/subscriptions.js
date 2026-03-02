const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const authMiddleware = require('../middleware/auth');

// Get user subscriptions
router.get('/my-subscriptions', authMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.userId })
      .populate('cookId', 'businessName')
      .sort({ createdAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get cook subscriptions
router.get('/cook-subscriptions', authMiddleware, async (req, res) => {
  try {
    const Cook = require('../models/Cook');
    const cook = await Cook.findOne({ userId: req.userId });

    if (!cook) {
      return res.status(404).json({ message: 'Cook not found' });
    }

    const subscriptions = await Subscription.find({ cookId: cook._id })
      .populate('userId', 'name phone')
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create subscription
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { cookId, planType, mealsPerDay, mealTypes, startDate, endDate, totalCost, deliveryDays } = req.body;

    const subscription = new Subscription({
      userId: req.userId,
      cookId,
      planType,
      mealsPerDay,
      mealTypes,
      startDate,
      endDate,
      totalCost,
      deliveryDays,
    });

    await subscription.save();
    res.status(201).json({ message: 'Subscription created', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update subscription
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (subscription.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ message: 'Subscription updated', subscription: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel subscription
router.post('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (subscription.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.json({ message: 'Subscription cancelled', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
