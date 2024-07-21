const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  line: { type: String },
  line_no: { type: Number },
  path: [{ name: { type: String } }],
  path_time: { type: String },
  station_interchange_time: { type: Number },
  start: { type: String },
  end: { type: String },
  towards_station: { type: String },
  platform_name: { type: String },
});

const DelhiStationSchema = new mongoose.Schema({
  originCode: String,
  destinationCode: String,
  from: String,
  to: String,
  fare: Number,
  stations: Number,
  total_time: String,
  route_type: {type:String, default: "least-distance"},
  route: [RouteSchema],
});

const DelhiStationMISchema = new mongoose.Schema({
  originCode: String,
  destinationCode: String,
  from: String,
  to: String,
  fare: Number,
  stations: Number,
  total_time: String,
  route_type: {type:String, default: "minimum-interchange"},
  route: [RouteSchema],
});

const DelhiStationsLD = mongoose.model("DelhiStations", DelhiStationSchema);
const DelhiStationsMI = mongoose.model("DelhiStationsMinimumInterchange", DelhiStationMISchema);

module.exports = {DelhiStationsLD , DelhiStationsMI};
