import constructorStandingDataProcessing from "@/utils/constructorStandingDataProcessing";
import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect} from "react";
import ConstructorsStandingTable from "./ConstructorsStandingTable";
import LoadingSpinner from "./LoadingSpinner";

const DriverStandings = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [constructorsStanding, setConstructorsStanding] = useState([]);
  const [seasonInfo, setSeasonInfo] = useState({});

  const fetchData = async () => {
    const res = await axios.get(
      "http://ergast.com/api/f1/current/constructorStandings"
    );
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const fetchedData = json.MRData.StandingsTable.StandingsList;
    const formattedData = constructorStandingDataProcessing(fetchedData);
    setConstructorsStanding(formattedData.constructorStanding);
    setSeasonInfo(formattedData.seasonInfo);
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

  if (!constructorsStanding || !seasonInfo || loading) {
    return <LoadingSpinner />;
  }

  return (
    <ConstructorsStandingTable
      standings={constructorsStanding}
      lastUpdated={seasonInfo}
    />
  );
};
export default DriverStandings;
