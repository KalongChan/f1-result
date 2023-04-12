import RaceResultTable from "@/components/RaceResult/RaceResultTable";
import axios from "axios";
var convert = require("xml-js");
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import raceDataFormatter from "@/utils/raceDataFormatter";
import Schedule from "@/components/Schedule/Schedule";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NotUpdated from "@/components/NotUpdated/NotUpdated";
import TabSelector from "@/components/ui/TabSelector";
import useDisplayMode from "@/hooks/useDisplayMode";
import RaceInfo from "@/components/RaceInfo/RaceInfo";

const Race = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [raceInfo, setRaceInfo] = useState();
  const [raceResult, setRaceResult] = useState();
  const router = useRouter();
  const {year, round} = router.query;
  const mode = useDisplayMode();

  const fetchData = async () => {
    if (year && round) {
      const res = await axios.get(
        `http://ergast.com/api/f1/${year}/${round}/results`
      );
      var options = {compact: true, ignoreComment: true, spaces: 4};
      const json = convert.xml2js(res.data, options);
      const fetchedData = json.MRData.RaceTable.Race;
      const formattedData = raceDataFormatter(fetchedData);
      setRaceInfo(formattedData.raceInfo);
      setRaceResult(formattedData.raceResult);
    }
  };

  const resetLoading = () => {
    setLoading(true);
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
  }, [firstRender, year, round]);

  //Render for <1280px width
  const [displayCategory, setDisplayCategory] = useState("result");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  if (!raceInfo || !raceResult || loading) {
    return <LoadingSpinner />;
  }

  const selectorData = ["result", "schedule"];
  if (mode === "mobile") {
    return (
      <div className="race__container">
        {raceResult.length > 0 && Object.keys(raceInfo).length > 0 && (
          <div className="race">
            <div className="race__upper">
              {displayCategory === "result" && <RaceInfo raceInfo={raceInfo} />}
              <TabSelector
                selectorData={selectorData}
                modeHandler={modeHandler}
              />
            </div>

            <div className="race__lower">
              {displayCategory === "result" && (
                <RaceResultTable raceResult={raceResult} />
              )}
              {displayCategory === "schedule" && (
                <Schedule
                  raceInfo={raceInfo}
                  enableFetch={true}
                  resetLoading={resetLoading}
                />
              )}
            </div>
          </div>
        )}
        {raceResult.length <= 0 && Object.keys(raceInfo).length <= 0 && (
          <NotUpdated />
        )}
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="race__container">
        {raceResult.length <= 0 && Object.keys(raceInfo).length <= 0 && (
          <NotUpdated />
        )}

        {raceResult.length > 0 && Object.keys(raceInfo).length > 0 && (
          <div className="race">
            <div className="race__upper">
              <div className="race__upper-left">
                <RaceInfo raceInfo={raceInfo} />
              </div>
              <div className="race__upper-right">
                <div className="race__track-layout">
                  <img src={`circuit/${raceInfo.round}.png`} />
                </div>
              </div>
            </div>

            <div className="race__lower">
              <div className="race__lower-left">
                <RaceResultTable raceResult={raceResult} />
              </div>
              <div className="race__lower-right">
                {year === new Date().getFullYear().toString() && (
                  <Schedule
                    raceInfo={raceInfo}
                    enableFetch={true}
                    resetLoading={resetLoading}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};
export default Race;
