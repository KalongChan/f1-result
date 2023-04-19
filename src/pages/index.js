import {useState, Fragment} from "react";
import RaceResultTable from "@/components/RaceResult/RaceResultTable";
import Schedule from "@/components/Schedule/Schedule";
import TabSelector from "@/components/ui/TabSelector";
import useDisplayMode from "@/hooks/useDisplayMode";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import RaceInfo from "@/components/RaceInfo/RaceInfo";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Error/Error";

const Index = () => {
  const mode = useDisplayMode();

  const {
    data: lastestRaceData,
    loading: lastestRaceLoading,
    error: lastestRaceError,
  } = useFetch("https://ergast.com/api/f1/current/last/results", "raceData");

  const {
    data: scheduleData,
    loading: scheduleLoading,
    error: scheduleError,
  } = useFetch("https://ergast.com/api/f1/current", "schedule");

  //Render for <1280px width
  const [displayCategory, setDisplayCategory] = useState("result");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  if (lastestRaceError || scheduleError) {
    return <Error />;
  }

  if (
    !lastestRaceData ||
    !scheduleData ||
    lastestRaceLoading ||
    scheduleLoading
  ) {
    return <LoadingSpinner />;
  }

  const selectorData = ["result", "schedule"];
  if (mode === "mobile") {
    return (
      <div className="race__container">
        {lastestRaceData && scheduleData && (
          <div className="race">
            <div className="race__upper">
              {displayCategory === "result" && (
                <RaceInfo raceInfo={lastestRaceData.raceInfo} />
              )}

              <TabSelector
                selectorData={selectorData}
                modeHandler={modeHandler}
              />
            </div>

            <div className="race__lower">
              {displayCategory === "result" && (
                <RaceResultTable raceResult={lastestRaceData.raceResult} />
              )}

              {displayCategory === "schedule" && (
                <Fragment>
                  <Schedule
                    raceInfo={lastestRaceData.raceInfo}
                    schedule={scheduleData.schedule}
                    parseRaceTime={scheduleData.parseRaceTime}
                    enableFetch={false}
                  />
                </Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="race__container">
        {lastestRaceData && scheduleData && (
          <div className="race">
            <div className="race__upper">
              <div className="race__upper-left">
                <RaceInfo raceInfo={lastestRaceData.raceInfo} />
              </div>
              <div className="race__upper-right">
                <div className="race__track-layout">
                  <img src={`circuit/${lastestRaceData.raceInfo.round}.png`} />
                </div>
              </div>
            </div>
            <div className="race__lower">
              <div className="race__lower-left">
                <RaceResultTable raceResult={lastestRaceData.raceResult} />
              </div>
              <div className="race__lower-right">
                <Schedule
                  raceInfo={lastestRaceData.raceInfo}
                  schedule={scheduleData.schedule}
                  parseRaceTime={scheduleData.parseRaceTime}
                  enableFetch={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};
export default Index;
