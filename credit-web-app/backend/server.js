// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://becksmoreland:GoJackets@cluster0.2fhr7lb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import routes
const classesRoutes = require('./routes/classes');
app.use('/api/classes', classesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
