import ConstructorsStanding from "@/components/ConstructorsStanding";
import DriverStandings from "@/components/DriverStandings";
import LastestRace from "@/components/LastestRace";
import TabSelector from "@/components/TabSelector";
import {Fragment, useState} from "react";

const test = () => {
  const [displayCategory, setDisplayCategory] = useState("driver");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  const selectorData = ["driver", "constructor"];

  return (
    <Fragment>
      <TabSelector modeHandler={modeHandler} selectorData={selectorData} />
      {displayCategory === "driver" && <DriverStandings />}
      {displayCategory === "constructor" && <ConstructorsStanding />}
    </Fragment>
  );
};
export default test;
