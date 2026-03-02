const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.log('📝 Note: Application will run with limited functionality');
    console.log('💡 To use MongoDB: Install locally or use MongoDB Atlas');
    
    // Don't exit - allow app to run with limited DB functionality
    return null;
  }
};

module.exports = connectDB;
