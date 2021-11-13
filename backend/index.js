const express = require("express");
const cors = require("cors");
const project_owner = require("./routes/project_owner");
const project = require("./routes/project");
const mongo_controller = require("./routes/project_owner_nosql");
const mongo_connection = require("./db_connection/mongo_connection");
const app = express();
require("dotenv").config();

// connect to mongo database
mongo_connection.connectWithRetry();

// Middleware
app.use(
  "*",
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route
app.use("/owner", project_owner);
app.use("/project", project);
app.use("/owner2", mongo_controller);

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
