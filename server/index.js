const express = require("express");
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
const { PORT } = require("./constants/server");


const routes = require("./routes/index");

// Add headers
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", routes);

//Twiiter API

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
