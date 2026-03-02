const mongoose = require('mongoose');
require('dotenv').config();

const Cook = require('./models/Cook');
const Menu = require('./models/Menu');
const User = require('./models/User');

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Cook.deleteMany({});
    await Menu.deleteMany({});
    await User.deleteMany({ role: 'cook' });
    console.log('🗑️ Cleared existing data');

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

    console.log('👥 Created 3 sample cooks');

    // Create sample cooks
    const cook1 = await Cook.create({
      userId: user1._id,
      businessName: 'Priya\'s Home Kitchen',
      cuisineType: ['North Indian', 'Vegetarian'],
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
      cuisineType: ['South Indian', 'Vegetarian'],
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

    console.log('🍽️ Created 3 cook profiles');

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
    console.log('🍲 Created 12 menu items');

    console.log('\n✅ Seeding completed successfully!');
    console.log('📊 Sample data ready for browsing\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seedData();
