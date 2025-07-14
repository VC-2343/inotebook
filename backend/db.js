const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017";

const connectToMongo = async () => {
 await mongoose.connect(uri)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

module.exports = connectToMongo;
