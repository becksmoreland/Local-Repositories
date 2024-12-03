// backend/routes/classes.js
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');
const getClassModel = require('../models/Class');

// GET classes by grade and community
router.get('/:grade/:community', async (req, res) => {
  const { grade, community } = req.params;

  try {
    const connection = await connectToDatabase(community);
    const Class = getClassModel(connection);

    const classes = await Class.find({ Grade: grade });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
