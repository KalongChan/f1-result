import constructorStandingDataProcessing from "@/utils/constructorStandingDataProcessing";
import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect, Fragment} from "react";

const DriverStandings = () => {
  const [loaded, setLoaded] = useState(false);
  const [constructorsStanding, setConstructorsStanding] = useState({});
  const [seasonInfo, setSeasonInfo] = useState([]);

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
    if (!loaded) {
      setLoaded(true);
      return;
    }
    fetchData();
  }, [loaded]);

  return <div>DriverStandings</div>;
};
export default DriverStandings;
