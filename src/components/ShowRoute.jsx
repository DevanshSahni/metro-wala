import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/showRoute.css";
import dmrc from "../assets/images/icon_dmrc.png";
import timer from "../assets/images/icon_time.png";
import {
  FaIndianRupeeSign,
  FaArrowRight,
  FaCaretUp,
  FaCaretDown,
  FaCircle,
} from "react-icons/fa6";
import stations from "../assets/data/stations.json";
import { IoFootsteps } from "react-icons/io5";
import { IoIosSwap } from "react-icons/io";

const ShowRoute = () => {
  const { origin } = useParams();
  const { destination } = useParams();
  const [shortestRoute, setShortestRoute] = useState(true);
  const navigate = useNavigate();
  const intermediateStations = ["Station ABC", "Dwarka", "Hauz khas"];

  const originColor = stations
    .find((station) => station.station_name === origin)
    .line.split(" ")[0];

  const destinationColor = stations
    .find((station) => station.station_name === destination)
    .line.split(" ")[0];

  return (
    <div className="showRouteWrapper">
      <div className="routeContainer">
        <header className="routeSummary">
          <div className="routeSummaryStation">
            <div className="routeSummaryStationElement">
              <FaCircle
                className="routeSummaryStationElementIcon"
                style={{ color: originColor }}
              />
              <span>
                <h3>{origin}</h3>
                <h5 className="routeSummaryStationElementTime">09:30 am</h5>
              </span>
            </div>

            <FaArrowRight className="routeSummaryStationIcon" />

            <div className="routeSummaryStationElement">
              <FaCircle
                className="routeSummaryStationElementIcon"
                style={{ color: destinationColor }}
              />
              <span>
                <h3>{destination}</h3>
                <h5 className="routeSummaryStationElementTime">10:20 am</h5>
              </span>
            </div>
          </div>
          <div className="routeSummaryFooter">
            <h4 className="routeSummaryFooterElement">
              <img
                className="routeSummaryFooterIcon"
                src={dmrc}
                alt="DMRC icon"
              />
              Stations<b>12</b>
            </h4>
            <h4 className="routeSummaryFooterElement">
              <img
                className="routeSummaryFooterIcon"
                src={timer}
                alt="Timer icon"
              />
              Time<b>28 mins</b>
            </h4>
            <h4 className="routeSummaryFooterElement">
              <FaIndianRupeeSign className="routeSummaryFooterIcon" />
              Fare
              <b>
                <FaIndianRupeeSign />
                104
              </b>
            </h4>
          </div>
        </header>

        <div className="routeTab">
          <button
            type="button"
            className={`routeTabButton ${
              shortestRoute && "activeRouteTabButton"
            }`}
            onClick={() => setShortestRoute(true)}
          >
            <h5>Shortest Route</h5>
          </button>
          <button
            type="button"
            className={`routeTabButton ${
              !shortestRoute && "activeRouteTabButton"
            }`}
            onClick={() => setShortestRoute(false)}
          >
            <h5>Minimum Interchange</h5>
          </button>
        </div>

        <main className="routeDescription">
          <StationRoute
            stationColor={originColor}
            station={origin}
            intermediateStations={intermediateStations}
          />

          <div className="routeDescriptionTransition">
            <h4>
              Change here to <b>Blue line</b>
            </h4>
            <h4>
              <IoFootsteps className="routeDescriptionTransitionIcon" /> Walk
              <b> 5 mins</b>
            </h4>
          </div>

          <StationRoute
            stationColor={destinationColor}
            station={destination}
            intermediateStations={intermediateStations}
          />
        </main>

        <button
          type="button"
          className="routeSwapButton"
          onClick={() => navigate(`/route/${destination}/${origin}`)}
        >
          View Return Journey <IoIosSwap />
        </button>
      </div>
    </div>
  );
};

const StationRoute = ({ stationColor, station, intermediateStations }) => {
  const [showIntermediate, setShowIntermediate] = useState(false);

  return (
    <div
      className="routeDescriptionSection"
      style={{ borderColor: stationColor }}
    >
      <FaCircle
        className="routeDescriptionSectionIcon"
        style={{
          color: stationColor,
          top: "-1px",
        }}
      />
      <FaCircle
        className="routeDescriptionSectionIcon"
        style={{
          color: stationColor,
          bottom: "-1px",
        }}
      />

      <div className="routeDescriptionSectionStation">
        <span>
          <h3>{station}</h3>
          <h5 className="routeDescriptionSectionStationPlatform">
            Platform No. 2
          </h5>
        </span>
        <h5 className="routeDescriptionSectionStationTowards">
          Towards <br /> Samaypur Badli
        </h5>
      </div>

      <div className="routeDescriptionSectionIntermediate">
        {showIntermediate ? (
          <>
            {intermediateStations.map((station) => (
              <li>{station}</li>
            ))}

            <h5 onClick={() => setShowIntermediate(!showIntermediate)}>
              Hide {intermediateStations?.length} stations <FaCaretUp />
            </h5>
          </>
        ) : (
          intermediateStations && (
            <h5 onClick={() => setShowIntermediate(!showIntermediate)}>
              Show all {intermediateStations?.length} stations <FaCaretDown />
            </h5>
          )
        )}
      </div>

      <div className="routeDescriptionSectionStation">
        <span>
          <h3>Rajiv Chowk</h3>
          <h5 className="routeDescriptionSectionStationPlatform">
            Platform No. 1
          </h5>
        </span>
      </div>
    </div>
  );
};

export default ShowRoute;
