import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect, Fragment} from "react";
import RaceResultTable from "../components/RaceResultTable";
import raceDataProcessing from "@/utils/raceDataProcessing";
import Schedule from "../components/Schedule";
import TabSelector from "../components/TabSelector";
import useDisplayMode from "@/utils/useDisplayMode";
import LoadingSpinner from "@/components/LoadingSpinner";

const index = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [raceInfo, setRaceInfo] = useState();
  const [raceResult, setRaceResult] = useState();
  const [schedule, setSchedule] = useState();
  const [parseRaceTime, setParseRaceTime] = useState();
  const mode = useDisplayMode();

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

    const scheduleRes = await axios.get("http://ergast.com/api/f1/current");
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const scheduleJson = convert.xml2js(scheduleRes.data, options);
    const data = scheduleJson.MRData.RaceTable.Race;
    const parseRaceTime = [];
    data.map((race) => {
      parseRaceTime.push(Date.parse(new Date(race.Date._text)));
    });
    setSchedule(data);
    setParseRaceTime(parseRaceTime);
  };

  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
      return;
    }
    fetchData();
  }, [firstRender]);

  //Render for <1280px width
  const [displayCategory, setDisplayCategory] = useState("result");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (!raceInfo || !raceResult || !schedule || loading) {
    return <LoadingSpinner />;
  }

  const selectorData = ["result", "schedule"];
  if (mode === "mobile") {
    return (
      <div className="race__container">
        {raceResult && schedule && (
          <Fragment>
            <TabSelector
              selectorData={selectorData}
              modeHandler={modeHandler}
            />
            {displayCategory === "result" && (
              <RaceResultTable raceResult={raceResult} raceInfo={raceInfo} />
            )}
            {displayCategory === "schedule" && (
              <Schedule
                raceInfo={raceInfo}
                schedule={schedule}
                parseRaceTime={parseRaceTime}
                enableFetch={false}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="race__container">
        {raceResult && schedule && (
          <Fragment>
            <RaceResultTable raceResult={raceResult} raceInfo={raceInfo} />
            <Schedule
              raceInfo={raceInfo}
              schedule={schedule}
              parseRaceTime={parseRaceTime}
              enableFetch={false}
            />
          </Fragment>
        )}
      </div>
    );
  }
};
export default index;
