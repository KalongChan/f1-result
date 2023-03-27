import driverStandingsDataProcess from "@/utils/driverStandingsDataProcess";
import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect, Fragment} from "react";
import DriverStandingsTable from "./DriverStandingsTable";

const DriverStandings = () => {
  const [loaded, setLoaded] = useState(false);
  const [driverStandings, setDriverStandings] = useState([]);
  const [seasonInfo, setSeasonInfo] = useState({});

  const fetchData = async () => {
    const res = await axios.get(
      "http://ergast.com/api/f1/current/driverStandings"
    );
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const fetchedData = json.MRData.StandingsTable.StandingsList;
    const formattedData = driverStandingsDataProcess(fetchedData);
    setDriverStandings(formattedData.driverStandings);
    setSeasonInfo(formattedData.seasonInfo);
  };

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    fetchData();
  }, [loaded]);

  return (
    <DriverStandingsTable
      standings={driverStandings}
      lastUpdated={seasonInfo}
    />
  );
};
export default DriverStandings;
