const LeftStations = require("../models/leftModel");
const { DelhiStationsMI, DelhiStationsLD } = require("../models/stationModel");

const storeData = async (req, res) => {
  try {
    const information = req.body.data;
    const originCode = req.body.originCode;
    const destinationCode = req.body.destinationCode;

    await DelhiStationsMI.create({
      originCode,
      destinationCode,
      from: information.from,
      to: information.to,
      fare: information.fare,
      stations: information.stations,
      total_time: information.total_time,
      route: information.route,
    });
    console.log("stored Successfully");
    res.status(201).json({ message: "Data stored successfully" });
  } catch (error) {
    console.log(error);
    await LeftStations.create({
      originCode,
      destinationCode,
    });
    res.status(500).json({ message: "Data not stored" });
  }
};

const findRoute = async (req, res) => {
  try {
    const { type, originCode, destinationCode } = req.body;

    if (type == "least-distance") {
      const route = await DelhiStationsLD.findOne({
        originCode,
        destinationCode,
      });
      if(route == null) res.status(404).json({message:"Route not find"})
      res.status(200).json(route);
    } else {
      const route = await DelhiStationsMI.findOne({
        originCode,
        destinationCode,
      });
      if(route == null) res.status(404).json({message:"Route not find"})
      res.status(200).json(route);
    }
  } catch (error) {
    console.error("Error finding least distance route:", error);
    res.status(500).json({message:"Error finding route"});
  }
};

module.exports = { storeData, findRoute };
