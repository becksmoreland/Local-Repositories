// backend/models/Class.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassSchema = new Schema({
  Class: { type: String, required: true },
  CreditType: { type: String, required: true },
  CreditAmount: { type: String, required: true },
  Grade: { type: String, required: true }
});

const getClassModel = (connection) => {
  return connection.model('Class', ClassSchema);
};

module.exports = getClassModel;
