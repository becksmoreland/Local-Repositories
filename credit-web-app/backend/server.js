// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://becksmoreland:GoJackets@cluster0.2fhr7lb.mongodb.net/MongoDB?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a schema and model
const classSchema = new mongoose.Schema({
  Class: String,
  CreditType: String,
  CreditAmount: String,
  Grade: String
});

// Adjust getModel function to match your database structure
const getModel = (community) => {
  // Dynamically create a model for each community
  return mongoose.model(`BHSClassData${community}`, classSchema, `BHSClassData${community}`);
};

// Route to fetch all classes for a community
app.get('/api/classes/:community', async (req, res) => {
  const { community } = req.params;
  const ClassModel = getModel(community);
  try {
    const classes = await ClassModel.find({});
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
