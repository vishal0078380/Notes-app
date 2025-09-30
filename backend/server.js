
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();


app.use((req, res, next) => {
  const origin = req.headers.origin || '*';

  
  if (origin && origin.includes('localhost')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

 
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} origin=${req.headers.origin || 'no-origin'}`);

  if (req.method === 'OPTIONS') {
    
    return res.sendStatus(200);
  }
  next();
});


app.use(express.json()); // body parser

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => res.json({ msg: 'API running' }));

//  error handling 
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.message ? err.message : err);
  res.status(500).json({ msg: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
