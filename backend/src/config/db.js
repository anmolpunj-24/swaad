require("dotenv").config();

const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB Working");
  } catch (err) {
    console.log("DB not connected", err);
    process.exit(1);
  }
};

module.exports = db;
