const express = require("express");
const { storeData, findRoute } = require("../controllers/stationController");
const router = express.Router();

//router.get("/get-all-stations", getAllStations);
router.post("/store-data", storeData);
router.post("/find-route", findRoute);

module.exports = router;
