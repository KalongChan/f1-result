import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect, Fragment} from "react";
import RaceResultTable from "./RaceResult";
import raceDataProcessing from "@/utils/raceDataProcessing";
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
    const formattedData = raceDataProcessing(fetchedData);
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
    <div className="race__container">
      <RaceResultTable raceResult={raceResult} raceInfo={raceInfo} />
      <Schedule raceInfo={raceInfo} />
    </div>
  );
};
export default LastestRace;
