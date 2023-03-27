import DriverStandings from "@/components/DriverStandings";
import ConstructorsStanding from "@/components/ConstructorsStanding";
import {useState} from "react";

const Standings = () => {
  const [mode, setMode] = useState("driver");

  const displayDriver = () => {
    setMode("driver");
  };
  const displayConstructor = () => {
    setMode("constructor");
  };

  return (
    <div className="standing">
      <div className="standing__mode">
        <div
          className={`standing__mode-button${
            mode === "driver" ? "--active" : ""
          }`}
          onClick={displayDriver}
        >
          Driver
        </div>
        <div
          className={`standing__mode-button${
            mode === "constructor" ? "--active" : ""
          }`}
          onClick={displayConstructor}
        >
          Constructor
        </div>
      </div>
      <div className="standing__table">
        {mode === "driver" && <DriverStandings />}
        {mode === "constructor" && <ConstructorsStanding />}
      </div>
    </div>
  );
};

export default Standings;
