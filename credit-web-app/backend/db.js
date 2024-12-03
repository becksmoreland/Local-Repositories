// backend/db.js
const mongoose = require('mongoose');

const connections = {};

const connectToDatabase = async (community) => {
  if (connections[community]) {
    return connections[community];
  }

  const dbName = `BHSClassData${community}`;
  const mongoURI = `mongodb+srv://becksmoreland:GoJackets@cluster0.2fhr7lb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${dbName}`;

  const connection = await mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  connections[community] = connection;
  return connection;
};

module.exports = { connectToDatabase };
