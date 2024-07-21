import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/showRoute.css";
import dmrc from "../assets/images/icon_dmrc.svg";
import timer from "../assets/images/icon_time.svg";
import {
  FaIndianRupeeSign,
  FaArrowRight,
  FaCaretUp,
  FaCaretDown,
  FaCircle,
} from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import stations from "../assets/data/stations.json";
import { IoFootsteps } from "react-icons/io5";
import { IoIosSwap } from "react-icons/io";
import colorCode from "../assets/data/colorCode.json";

const ShowRoute = () => {
  const { originCode } = useParams();
  const { destinationCode } = useParams();
  const [shortestRoute, setShortestRoute] = useState(true);
  const [routeInfo, setRouteInfo] = useState("");
  const navigate = useNavigate();

  const getRoute = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/find-route`,
      {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: shortestRoute ? "least-distance" : "minimum-interchange",
          originCode,
          destinationCode,
        }),
      }
    );
    if (response.status === 404) {
      alert(response.message);
    }
    const data = await response.json();
    setRouteInfo(data);
  }, [shortestRoute, originCode, destinationCode]);

  useEffect(() => {
    getRoute();
  }, [shortestRoute, originCode, destinationCode]);

  const originData = stations.find(
    (station) => station.station_code === originCode
  );

  const destinationData = stations.find(
    (station) => station.station_code === destinationCode
  );

  const convertIntoMinutes = (time) => {
    if (!time) return 0;
    const [hoursStr, minutesStr] = time.split(":");

    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    return hours * 60 + minutes;
  };

  const formattedTime = (mins) => {
    const now = new Date();

    now.setMinutes(now.getMinutes() + mins);

    let hours = now.getHours();
    const minutes = now.getMinutes();

    const period = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return time;
  };

  return (
    <div className="showRouteWrapper">
      <div className="routeContainer">
        <header className="routeSummary">
          <div className="routeSummaryStation">
            <div className="routeSummaryStationElement">
              <FaCircle
                className="routeSummaryStationElementIcon"
                style={{ color: colorCode[originData.metro_line] }}
              />
              <span>
                <h3>{originData.station_name}</h3>
                <h5 className="routeSummaryStationElementTime">
                  {formattedTime(0)}
                </h5>
              </span>
            </div>

            <FaArrowRight className="routeSummaryStationIcon" />

            <div className="routeSummaryStationElement">
              <FaCircle
                className="routeSummaryStationElementIcon"
                style={{ color: colorCode[destinationData.metro_line] }}
              />
              <span>
                <h3>{destinationData.station_name}</h3>
                <h5 className="routeSummaryStationElementTime">
                  {formattedTime(convertIntoMinutes(routeInfo.total_time))}
                </h5>
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
              Stations<b>{routeInfo.stations}</b>
            </h4>
            <h4 className="routeSummaryFooterElement">
              <img
                className="routeSummaryFooterIcon"
                src={timer}
                alt="Timer icon"
              />
              Time<b>{convertIntoMinutes(routeInfo.total_time)} mins</b>
            </h4>
            <h4 className="routeSummaryFooterElement">
              <GiTwoCoins className="routeSummaryFooterIcon" />
              Fare
              <b>
                <FaIndianRupeeSign />
                {routeInfo.fare}
              </b>
            </h4>
          </div>
        </header>

        {/* <div className="routeTab">
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
        </div> */}

        <main className="routeDescription">
          {routeInfo?.route?.map((routeElement, idx) => (
            <StationRoute key={idx} route={routeElement} />
          ))}
        </main>

        <button
          type="button"
          className="routeSwapButton"
          onClick={() => navigate(`/route/${destinationCode}/${originCode}`)}
        >
          View Return Journey <IoIosSwap />
        </button>
      </div>
    </div>
  );
};

const StationRoute = ({ route }) => {
  const [showIntermediate, setShowIntermediate] = useState(false);
  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => {
      return char.toUpperCase();
    });
  };
  return (
    <>
      {!!route.station_interchange_time && (
        <div className="routeDescriptionTransition">
          <h4>
            Change here to <b>{route.line}</b>
          </h4>
          <h4>
            <IoFootsteps className="routeDescriptionTransitionIcon" /> Walk
            <b> {route?.station_interchange_time} mins</b>
          </h4>
        </div>
      )}

      <div
        className="routeDescriptionSection"
        style={{ borderColor: colorCode[route.line] }}
      >
        <FaCircle
          className="routeDescriptionSectionIcon"
          style={{
            color: colorCode[route.line],
            top: "-1px",
          }}
        />
        <FaCircle
          className="routeDescriptionSectionIcon"
          style={{
            color: colorCode[route.line],
            bottom: "-1px",
          }}
        />

        <div className="routeDescriptionSectionStation">
          <span>
            <h3>{toTitleCase(route.start)}</h3>
            <h5 className="routeDescriptionSectionStationPlatform">
              {route.platform_name}
            </h5>
          </span>
          <h5 className="routeDescriptionSectionStationTowards">
            Towards <br /> {toTitleCase(route.towards_station)}
          </h5>
        </div>

        <div className="routeDescriptionSectionIntermediate">
          {showIntermediate ? (
            <>
              {route.path.map(
                (station, idx) =>
                  idx !== 0 &&
                  idx !== route.path?.length - 1 && (
                    <li key={idx}>{toTitleCase(station.name)}</li>
                  )
              )}

              <h5 onClick={() => setShowIntermediate(!showIntermediate)}>
                Hide {route.path?.length - 2} stations <FaCaretUp />
              </h5>
            </>
          ) : (
            route.path && (
              <h5 onClick={() => setShowIntermediate(!showIntermediate)}>
                Show all {route.path?.length} stations <FaCaretDown />
              </h5>
            )
          )}
        </div>

        <div className="routeDescriptionSectionStation">
          <span>
            <h3>{toTitleCase(route.end)}</h3>

            {/* <h5 className="routeDescriptionSectionStationPlatform">
              Platform No. 1
            </h5> */}
          </span>
        </div>
      </div>
    </>
  );
};

export default ShowRoute;
