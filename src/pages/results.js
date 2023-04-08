import RaceResultTable from "@/components/RaceResultTable";
import axios from "axios";
var convert = require("xml-js");
import {useRouter} from "next/router";
import {useState, useEffect, Fragment} from "react";
import raceDataProcessing from "@/utils/raceDataProcessing";
import Schedule from "@/components/Schedule";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotUpdated from "@/components/NotUpdated";
import TabSelector from "@/components/TabSelector";
import useDisplayMode from "@/utils/useDisplayMode";

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
      const formattedData = raceDataProcessing(fetchedData);
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
    fetchData();
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
        {raceResult && (
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
                enableFetch={true}
                resetLoading={resetLoading}
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
        {raceResult.length > 0 && Object.keys(raceInfo).length > 0 && (
          <RaceResultTable raceResult={raceResult} raceInfo={raceInfo} />
        )}
        {raceResult.length <= 0 && Object.keys(raceInfo).length <= 0 && (
          <NotUpdated />
        )}

        {year === new Date().getFullYear().toString() && (
          <Schedule
            raceInfo={raceInfo}
            enableFetch={true}
            resetLoading={resetLoading}
          />
        )}
      </div>
    );
  }
};
export default Race;
