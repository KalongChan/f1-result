import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect, Fragment} from "react";
import RaceResultTable from "../components/RaceResultTable";
import raceDataProcessing from "@/utils/raceDataProcessing";
import Schedule from "../components/Schedule";
import TabSelector from "../components/TabSelector";
import useDisplayMode from "@/utils/useDisplayMode";
import LoadingSpinner from "@/components/LoadingSpinner";
import RaceInfo from "@/components/RaceInfo";

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

    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    fetchData();

    return () => clearTimeout(timer);
  }, [firstRender]);

  //Render for <1280px width
  const [displayCategory, setDisplayCategory] = useState("result");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  if (!raceInfo || !raceResult || !schedule || loading) {
    return <LoadingSpinner />;
  }

  const selectorData = ["result", "schedule"];
  if (mode === "mobile") {
    return (
      <div className="race__container">
        {raceResult && schedule && (
          <div className="race">
            {displayCategory === "result" && <RaceInfo raceInfo={raceInfo} />}

            <TabSelector
              selectorData={selectorData}
              modeHandler={modeHandler}
            />

            {displayCategory === "result" && (
              <RaceResultTable raceResult={raceResult} />
            )}

            {displayCategory === "schedule" && (
              <Fragment>
                <Schedule
                  raceInfo={raceInfo}
                  schedule={schedule}
                  parseRaceTime={parseRaceTime}
                  enableFetch={false}
                />
              </Fragment>
            )}
          </div>
        )}
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="race__container">
        {raceResult && schedule && (
          <Fragment>
            <div className="race">
              <RaceInfo raceInfo={raceInfo} />
              <RaceResultTable raceResult={raceResult} />
            </div>
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
