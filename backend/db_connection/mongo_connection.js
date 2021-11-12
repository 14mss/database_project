const mongoose = require('mongoose');
require('dotenv').config();

//connect to mongo database
 mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const mongo_connection = mongoose.connection;

module.exports = mongo_connection;