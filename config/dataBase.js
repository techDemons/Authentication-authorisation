const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected...");
  })
  .catch((err) => {
    console.log("DB connection failure");
    console.error("Error details:", err.message); // Log the actual error message
    process.exit(1); // Stop the application if the DB connection fails
  });
};
