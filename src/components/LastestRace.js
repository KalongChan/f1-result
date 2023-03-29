import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect, Fragment} from "react";
import RaceResultTable from "./RaceResultTable";
import raceDataProcessing from "@/utils/raceDataProcessing";
import Schedule from "./Schedule";
import TabSelector from "./TabSelector";

const LastestRace = () => {
  const [loaded, setLoaded] = useState(false);
  const [raceInfo, setRaceInfo] = useState();
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

  //Desktop && Mobile mode checker
  const [mode, setMode] = useState("");
  const handleWindowResize = () => {
    if (window.innerWidth > 1280) {
      setMode("desktop");
    } else {
      setMode("mobile");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  //Render for <1280px width
  const [displayCategory, setDisplayCategory] = useState("result");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  const selectorData = ["result", "schedule"];

  if (mode === "mobile") {
    return (
      <div className="race__container">
        <TabSelector selectorData={selectorData} modeHandler={modeHandler} />
        {displayCategory === "result" && (
          <RaceResultTable raceResult={raceResult} raceInfo={raceInfo} />
        )}
        {displayCategory === "schedule" && <Schedule raceInfo={raceInfo} />}
      </div>
    );
  }

  return (
    <div className="race__container">
      <RaceResultTable raceResult={raceResult} raceInfo={raceInfo} />
      <Schedule raceInfo={raceInfo} />
    </div>
  );
};
export default LastestRace;
