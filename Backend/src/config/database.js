const mongoose = require('mongoose');

async function connectDB() {
  try{
    await mongoose.connect(process.env.MONGO_URI) 
    console.log("Database Connected")
    // console.log("Database:", mongoose.connection.name);
    // console.log("Host:", mongoose.connection.host);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;

    