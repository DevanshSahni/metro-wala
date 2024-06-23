import React, { useEffect, useState } from "react";
import "../styles/planJourney.css";
import background from "../assets/images/metroWalaBG.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineMic } from "react-icons/md";
import { IoIosSwap } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import data from "../assets/data/stations.json";

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
    navigate(`/route/${origin}/${destination}`);
  };

  const handleStationSwap = () => {
    let temp = destination;
    let tempData = destinationData;
    setDestination(origin);
    setOrigin(temp);
    setDestinationData(originData);
    setOriginData(tempData);
  };

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
                    color: `${originData.line.split(" ")[0]}`,
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

            {
              <PlanJourneyDropdown
                station={origin}
                setStation={setOrigin}
                setStationData={setOriginData}
                stationFocus={originFocus}
              />
            }
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
                    color: `${destinationData.line.split(" ")[0]}`,
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

            {
              <PlanJourneyDropdown
                station={destination}
                setStation={setDestination}
                setStationData={setDestinationData}
                stationFocus={destinationFocus}
              />
            }
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

const PlanJourneyDropdown = ({
  station,
  setStation,
  setStationData,
  stationFocus,
}) => {
  const [stationsCopy, setStationsCopy] = useState(data);

  useEffect(() => {
    setStationData(data.find((entry) => entry.station_name === station));

    setStationsCopy(
      data.filter((entry) =>
        entry.station_name.toLowerCase().includes(station.toLowerCase())
      )
    );
  }, [station, setStationData]);

  return (
    <>
      {stationFocus && (
        <ul className="planJourneyDropdown">
          {stationsCopy?.length ? (
            stationsCopy.map((station, idx) => {
              return (
                <li key={idx} onClick={() => setStation(station.station_name)}>
                  <FaCircle
                    style={{
                      color: `${station.line.split(" ")[0]}`,
                      fontSize: "9px",
                    }}
                  />
                  {station.station_name}
                </li>
              );
            })
          ) : (
            <li>No matching stations found</li>
          )}
        </ul>
      )}
    </>
  );
};
export default PlanJourney;
