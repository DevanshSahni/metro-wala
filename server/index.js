const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/routes");
const DelhiStations = require("./models/stationModel");
require("dotenv").config();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL);

app.use("/",router);

app.listen(4040, async (req, res) => {
  // console.log( await DelhiStations.countDocuments({originCode:"AIT"}));
  console.log("Server started");
});
