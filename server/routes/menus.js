const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const authMiddleware = require('../middleware/auth');
const Cook = require('../models/Cook');

// Get cook menu
router.get('/cook/:cookId', async (req, res) => {
  try {
    const menus = await Menu.find({ cookId: req.params.cookId });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add menu item (cook only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const cook = await Cook.findOne({ userId: req.userId });
    if (!cook) {
      return res.status(404).json({ message: 'Cook profile not found' });
    }

    const menu = new Menu({
      cookId: cook._id,
      ...req.body,
    });

    await menu.save();
    res.status(201).json({ message: 'Menu item added', menu });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update menu item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('cookId');
    const cook = await Cook.findOne({ userId: req.userId });

    if (menu.cookId._id.toString() !== cook._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ message: 'Menu item updated', menu: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete menu item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('cookId');
    const cook = await Cook.findOne({ userId: req.userId });

    if (menu.cookId._id.toString() !== cook._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
