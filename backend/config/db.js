
const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    if (!mongoUri || typeof mongoUri !== 'string') {
      console.error('Missing or invalid MONGO_URI. value:', mongoUri);
      throw new Error('MONGO_URI environment variable is required and must be a string');
    }

    //  for masking  password 
    const masked = mongoUri.replace(/(mongodb\+srv:\/\/.*?:)(.*?)(@.*)/, (m, p1, p2, p3) => `${p1}****${p3}`);
    console.log('Attempting to connect to MongoDB with URI:', masked);

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
