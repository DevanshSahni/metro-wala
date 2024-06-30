import React, { useEffect, useState } from "react";
import "../styles/planJourney.css";
import background from "../assets/images/metroWalaBG.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineMic } from "react-icons/md";
import { IoIosSwap } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import metroData from "../assets/data/stations.json";
import colorCode from "../assets/data/colorCode.json";

const PlanJourney = () => {
  const [origin, setOrigin] = useState("");
  const [originData, setOriginData] = useState(null);
  const [originFocus, setOriginFocus] = useState(false);

  const [destination, setDestination] = useState("");
  const [destinationFocus, setDestinationFocus] = useState(false);
  const [destinationData, setDestinationData] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      console.log("Kindly select origin and destination first");
      return;
    }
    navigate(
      `/route/${originData.station_code}/${destinationData.station_code}`
    );
  };

  const handleStationSwap = () => {
    let temp = destination;
    let tempData = destinationData;
    setDestination(origin);
    setOrigin(temp);
    setDestinationData(originData);
    setOriginData(tempData);
  };

  useEffect(() => {
    setOriginData(metroData.find((entry) => entry.station_name === origin));
  }, [origin]);

  useEffect(() => {
    setDestinationData(
      metroData.find((entry) => entry.station_name === destination)
    );
  }, [destination]);

  return (
    <>
      <img
        className="planJourneyBackground"
        src={background}
        alt="Background"
      />

      <form className="planJourneyContainer" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="planJourneyHeading">Plan your Journey</h1>
        <div className="planJourneyInputContainer">
          <label className="planJourneyInput">
            <div>
              {originData && (
                <FaCircle
                  style={{
                    color: `${colorCode[originData.metro_line]}`,
                    fontSize: "9px",
                  }}
                />
              )}

              <input
                type="text"
                placeholder="Search Origin Station"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onFocus={() => setOriginFocus(true)}
                onBlur={() => setTimeout(() => setOriginFocus(false), 300)}
              />
            </div>

            <MdOutlineMic className="planJourneyInputIcon" />

            {originFocus && (
              <PlanJourneyDropdown
                station={origin}
                setStation={setOrigin}
                setStationData={setOriginData}
              />
            )}
          </label>

          <button
            type="button"
            className="planJourneySwapIcon"
            disabled={!(originData && destinationData)}
            onClick={() => handleStationSwap()}
          >
            <IoIosSwap />
          </button>

          <label className="planJourneyInput">
            <div>
              {destinationData && (
                <FaCircle
                  style={{
                    color: `${colorCode[destinationData.metro_line]}`,
                    fontSize: "9px",
                  }}
                />
              )}

              <input
                type="text"
                placeholder="Search Destination Station"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setDestinationFocus(true)}
                onBlur={() => setTimeout(() => setDestinationFocus(false), 300)}
              />
            </div>

            <MdOutlineMic className="planJourneyInputIcon" />

            {destinationFocus && (
              <PlanJourneyDropdown
                station={destination}
                setStation={setDestination}
                setStationData={setDestinationData}
              />
            )}
          </label>
        </div>

        <button
          type="submit"
          className="planJourneyButton"
          disabled={!(originData && destinationData)}
        >
          Show Route
        </button>
      </form>
    </>
  );
};

const PlanJourneyDropdown = ({ station, setStation }) => {
  const [stationsCopy, setStationsCopy] = useState(metroData);

  useEffect(() => {
    setStationsCopy(
      metroData.filter((entry) =>
        entry.station_name.toLowerCase().includes(station.toLowerCase())
      )
    );
  }, [station]);

  return (
    <>
      {
        <ul className="planJourneyDropdown">
          {stationsCopy?.length ? (
            stationsCopy.map((metroStation, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => setStation(metroStation.station_name)}
                >
                  <FaCircle
                    style={{
                      color: `${colorCode[metroStation.metro_line]}`,
                      fontSize: "9px",
                    }}
                  />
                  {metroStation.station_name}
                </li>
              );
            })
          ) : (
            <li>No matching stations found</li>
          )}
        </ul>
      }
    </>
  );
};
export default PlanJourney;
