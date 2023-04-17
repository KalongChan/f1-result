import {Fragment} from "react";
import DriverStandings from "@/components/Standings/DriverStanding/DriverStanding";
import DriverConstructorSelector from "@/components/ui/DriverConstructorSelector";

const driver = () => {
  return (
    <div className="standing">
      <DriverConstructorSelector />
      <div className="standing__table">
        <DriverStandings />
      </div>
    </div>
  );
};

export default driver;
