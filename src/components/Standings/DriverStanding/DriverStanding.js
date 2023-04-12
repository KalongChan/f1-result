import driverStandingsDataFormatter from "@/utils/driverStandingsDataFormatter";
import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect} from "react";
import DriverStandingTable from "./DriverStandingTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import raceDataFormatter from "@/utils/raceDataFormatter";

const DriverStandings = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [driverStandings, setDriverStandings] = useState([]);
  const [lastUpdated, setLastUpdated] = useState({});

  const fetchData = async () => {
    const res = await axios.get(
      "http://ergast.com/api/f1/current/driverStandings"
    );
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const fetchedData = json.MRData.StandingsTable.StandingsList;
    const formattedData = driverStandingsDataFormatter(fetchedData);
    setDriverStandings(formattedData.driverStandings);
    // setSeasonInfo(formattedData.seasonInfo);

    const lastUpdatedRes = await axios.get(
      "http://ergast.com/api/f1/current/last/results"
    );
    const lastUpdatedJson = convert.xml2js(lastUpdatedRes.data, options);
    const lastUpdatedFetchedData = lastUpdatedJson.MRData.RaceTable.Race;
    const formattedLastUpdated = raceDataFormatter(lastUpdatedFetchedData);
    setLastUpdated(formattedLastUpdated.raceInfo);
  };

  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
      return;
    }

    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    fetchData();

    return () => clearTimeout(timer);
  }, [firstRender]);

  if (!driverStandings || !lastUpdated || loading) {
    return <LoadingSpinner />;
  }

  return (
    <DriverStandingTable
      standings={driverStandings}
      lastUpdated={lastUpdated}
    />
  );
};
export default DriverStandings;
