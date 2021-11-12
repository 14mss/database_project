const express = require('express');
const cors = require('cors');
const project_owner = require('./routes/project_owner');
const project = require('./routes/project');
const app = express();
require('dotenv').config()

// Middleware
app.use('*', cors({
    origin: process.env.ORIGIN
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// route
app.use('/owner',project_owner);
app.use('/project',project);


app.get('/', (req, res) => {
  return res.send('Hello');
});


app.listen(process.env.PORT, () => {
  console.log('Listening on port 5000');
});
