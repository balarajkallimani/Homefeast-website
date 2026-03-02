const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');
const Menu = require('../models/Menu');
const authMiddleware = require('../middleware/auth');

// Get all approved cooks
router.get('/', async (req, res) => {
  try {
    const { search, cuisine, area } = req.query;
    let filter = { isApproved: true };

    if (search) {
      filter.businessName = { $regex: search, $options: 'i' };
    }
    if (cuisine) {
      filter.cuisineType = cuisine;
    }
    if (area) {
      filter.serviceArea = { $regex: area, $options: 'i' };
    }

    const cooks = await Cook.find(filter).populate('userId', 'name phone');
    res.json(cooks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single cook
router.get('/:id', async (req, res) => {
  try {
    const cook = await Cook.findById(req.params.id)
      .populate('userId', 'name email phone')
      .lean();
    
    if (!cook) {
      return res.status(404).json({ message: 'Cook not found' });
    }

    const menus = await Menu.find({ cookId: cook._id });
    res.json({ ...cook, menus });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register as cook
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { businessName, cuisineType, serviceArea, mealTypes } = req.body;

    const cook = new Cook({
      userId: req.userId,
      businessName,
      cuisineType,
      serviceArea,
      mealTypes,
    });

    await cook.save();
    res.status(201).json({ message: 'Cook application submitted', cook });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cook profile
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const cook = await Cook.findById(req.params.id);

    if (cook.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Cook.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ message: 'Cook profile updated', cook: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
