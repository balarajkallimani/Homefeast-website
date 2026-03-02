const express = require('express');
const router = express.Router();
const Cook = require('../models/Cook');
const Menu = require('../models/Menu');
const User = require('../models/User');

// Seed sample data
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await Cook.deleteMany({});
    await Menu.deleteMany({});

    // Create sample users (cooks)
    const user1 = await User.create({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: 'password123',
      role: 'cook',
    });

    const user2 = await User.create({
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      password: 'password123',
      role: 'cook',
    });

    const user3 = await User.create({
      name: 'Ananya Patel',
      email: 'ananya@example.com',
      password: 'password123',
      role: 'cook',
    });

    // Create sample cooks
    const cook1 = await Cook.create({
      userId: user1._id,
      businessName: 'Priya\'s Home Kitchen',
      cuisineType: ['North Indian', 'Mughlai'],
      serviceArea: 'Downtown, Sector 5',
      mealTypes: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
      rating: 4.8,
      isApproved: true,
    });

    const cook2 = await Cook.create({
      userId: user2._id,
      businessName: 'Rajesh\'s Spice Garden',
      cuisineType: ['South Indian', 'Tamil', 'Andhra'],
      serviceArea: 'Suburbs, Sector 12',
      mealTypes: {
        breakfast: true,
        lunch: true,
        dinner: false,
      },
      rating: 4.6,
      isApproved: true,
    });

    const cook3 = await Cook.create({
      userId: user3._id,
      businessName: 'Ananya\'s Healthy Bites',
      cuisineType: ['Vegetarian', 'Vegan', 'Continental'],
      serviceArea: 'Midtown, Sector 8',
      mealTypes: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
      rating: 4.9,
      isApproved: true,
    });

    // Create sample menus
    const menus = [
      // Priya's menu
      { cookId: cook1._id, dishName: 'Chicken Biryani', price: 180, mealType: 'lunch', ingredients: ['chicken', 'rice', 'spices'] },
      { cookId: cook1._id, dishName: 'Butter Chicken', price: 200, mealType: 'dinner', ingredients: ['chicken', 'cream', 'tomato'] },
      { cookId: cook1._id, dishName: 'Paratha with Curd', price: 60, mealType: 'breakfast', ingredients: ['wheat', 'butter', 'yogurt'] },
      { cookId: cook1._id, dishName: 'Dal Makhani', price: 120, mealType: 'lunch', ingredients: ['lentils', 'cream', 'butter'] },

      // Rajesh's menu
      { cookId: cook2._id, dishName: 'Dosa with Sambar', price: 80, mealType: 'breakfast', ingredients: ['rice', 'lentil', 'vegetables'] },
      { cookId: cook2._id, dishName: 'Idli with Chutney', price: 50, mealType: 'breakfast', ingredients: ['rice flour', 'lentils', 'coconut'] },
      { cookId: cook2._id, dishName: 'Hyderabadi Dum Biryani', price: 170, mealType: 'lunch', ingredients: ['meat', 'rice', 'spices'] },
      { cookId: cook2._id, dishName: 'Andhra Fish Curry', price: 220, mealType: 'lunch', ingredients: ['fish', 'tamarind', 'chili'] },

      // Ananya's menu
      { cookId: cook3._id, dishName: 'Quinoa Buddha Bowl', price: 150, mealType: 'lunch', ingredients: ['quinoa', 'vegetables', 'tofu'] },
      { cookId: cook3._id, dishName: 'Smoothie Bowl', price: 80, mealType: 'breakfast', ingredients: ['berries', 'yogurt', 'granola'] },
      { cookId: cook3._id, dishName: 'Vegan Pasta Primavera', price: 140, mealType: 'dinner', ingredients: ['pasta', 'vegetables', 'olive oil'] },
      { cookId: cook3._id, dishName: 'Green Salad with Tahini', price: 100, mealType: 'lunch', ingredients: ['greens', 'tahini', 'vegetables'] },
    ];

    await Menu.insertMany(menus);

    res.json({
      message: 'Sample data created successfully',
      cooks: [cook1, cook2, cook3],
      menus: menus,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding data', error: error.message });
  }
});

module.exports = router;
