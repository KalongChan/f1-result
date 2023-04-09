import constructorStandingDataProcessing from "@/utils/constructorStandingDataProcessing";
import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect} from "react";
import ConstructorsStandingTable from "./ConstructorsStandingTable";
import LoadingSpinner from "./LoadingSpinner";
import raceDataProcessing from "@/utils/raceDataProcessing";

const DriverStandings = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [constructorsStanding, setConstructorsStanding] = useState([]);
  const [lastUpdated, setLastUpdated] = useState({});

  const fetchData = async () => {
    const res = await axios.get(
      "http://ergast.com/api/f1/current/constructorStandings"
    );
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const fetchedData = json.MRData.StandingsTable.StandingsList;
    const formattedData = constructorStandingDataProcessing(fetchedData);
    setConstructorsStanding(formattedData.constructorStanding);

    const lastUpdatedRes = await axios.get(
      "http://ergast.com/api/f1/current/last/results"
    );
    const lastUpdatedJson = convert.xml2js(lastUpdatedRes.data, options);
    const lastUpdatedFetchedData = lastUpdatedJson.MRData.RaceTable.Race;
    const formattedLastUpdated = raceDataProcessing(lastUpdatedFetchedData);
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

  if (!constructorsStanding || !lastUpdated || loading) {
    return <LoadingSpinner />;
  }

  return (
    <ConstructorsStandingTable
      standings={constructorsStanding}
      lastUpdated={lastUpdated}
    />
  );
};
export default DriverStandings;
