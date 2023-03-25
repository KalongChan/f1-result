import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect, Fragment} from "react";
import RaceResult from "./RaceResult";
import raceData from "@/utils/raceData";
import Schedule from "./Schedule";

const LastestRace = () => {
  const [loaded, setLoaded] = useState(false);
  const [raceInfo, setRaceInfo] = useState({});
  const [raceResult, setRaceResult] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      "http://ergast.com/api/f1/current/last/results"
    );
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const fetchedData = json.MRData.RaceTable.Race;
    const formattedData = raceData(fetchedData);
    setRaceInfo(formattedData.raceInfo);
    setRaceResult(formattedData.raceResult);
  };

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    fetchData();
  }, [loaded]);

  return (
    <Fragment>
      <RaceResult raceResult={raceResult} raceInfo={raceInfo} />
      <Schedule raceInfo={raceInfo} />
    </Fragment>
  );
};
export default LastestRace;
