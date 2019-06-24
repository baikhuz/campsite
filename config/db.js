const mongoose = require("mongoose");
const config = require("config");

// VV config package accesses default.json by default, takes mongoURI key-value pair from it VV
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // line below prompts mongoose to use the new version of parses (the older is deprecated and throws a warning)
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Database is connected.");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
