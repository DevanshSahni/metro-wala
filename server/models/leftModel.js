const mongoose = require("mongoose");

const LeftStationsSchema = new mongoose.Schema({
  originCode: String,
  destinationCode: String,
});

const LeftStations = mongoose.model("LeftStations", LeftStationsSchema);

module.exports = LeftStations;
