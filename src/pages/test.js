import ConstructorsStanding from "@/components/Standings/ConstructorStanding/ConstructorStanding";
import DriverStandings from "@/components/Standings/DriverStanding/DriverStanding";
import LastestRace from "@/components/LastestRace";
import TabSelector from "@/components/ui/TabSelector";
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
