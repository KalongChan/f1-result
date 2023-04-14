import RaceResultTable from "@/components/RaceResult/RaceResultTable";

import {useRouter} from "next/router";
import {useState} from "react";
import Schedule from "@/components/Schedule/Schedule";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NotUpdated from "@/components/NotUpdated/NotUpdated";
import TabSelector from "@/components/ui/TabSelector";
import useDisplayMode from "@/hooks/useDisplayMode";
import RaceInfo from "@/components/RaceInfo/RaceInfo";
import useFetch from "@/hooks/useFetch";

const Race = () => {
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const {year, round} = router.query;
  const mode = useDisplayMode();

  const {
    data: raceData,
    loading: raceLoading,
    error: raceError,
  } = useFetch(`http://ergast.com/api/f1/${year}/${round}/results`, "raceData");

  console.log(raceData);

  const resetLoading = () => {
    setReload(true);
    let timer = setTimeout(() => {
      setReload(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  const resetDisplayCategory = () => {
    setDisplayCategory("result");
  };

  //Render for <1280px width
  const [displayCategory, setDisplayCategory] = useState("result");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  if (!raceData || raceLoading || reload) {
    return <LoadingSpinner />;
  }

  const selectorData = ["result", "schedule"];
  if (mode === "mobile") {
    return (
      <div className="race__container">
        {raceData.raceResult.length > 0 &&
          Object.keys(raceData.raceInfo).length > 0 && (
            <div className="race">
              <div className="race__upper">
                {displayCategory === "result" && (
                  <RaceInfo raceInfo={raceData.raceInfo} />
                )}
                <TabSelector
                  selectorData={selectorData}
                  modeHandler={modeHandler}
                />
              </div>

              <div className="race__lower">
                {displayCategory === "result" && (
                  <RaceResultTable raceResult={raceData.raceResult} />
                )}
                {displayCategory === "schedule" && (
                  <Schedule
                    raceInfo={raceData.raceInfo}
                    enableFetch={true}
                    resetLoading={resetLoading}
                    resetDisplayCategory={resetDisplayCategory}
                  />
                )}
              </div>
            </div>
          )}
        {raceData.raceResult.length <= 0 &&
          Object.keys(raceData.raceInfo).length <= 0 && <NotUpdated />}
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="race__container">
        {raceData.raceResult.length <= 0 &&
          Object.keys(raceData.raceInfo).length <= 0 && <NotUpdated />}

        {raceData.raceResult.length > 0 &&
          Object.keys(raceData.raceInfo).length > 0 && (
            <div className="race">
              <div className="race__upper">
                <div className="race__upper-left">
                  <RaceInfo raceInfo={raceData.raceInfo} />
                </div>
                <div className="race__upper-right">
                  <div className="race__track-layout">
                    <img src={`circuit/${raceData.raceInfo.round}.png`} />
                  </div>
                </div>
              </div>

              <div className="race__lower">
                <div className="race__lower-left">
                  <RaceResultTable raceResult={raceData.raceResult} />
                </div>
                <div className="race__lower-right">
                  {year === new Date().getFullYear().toString() && (
                    <Schedule
                      raceInfo={raceData.raceInfo}
                      enableFetch={true}
                      resetLoading={resetLoading}
                      resetDisplayCategory={resetDisplayCategory}
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
