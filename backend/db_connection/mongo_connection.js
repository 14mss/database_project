const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("successfully connected the database");
    })
    .catch((err) => {
      console.log("can not connect to database");
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = {
  connectWithRetry,
};
