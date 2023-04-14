import ConstructorsStanding from "@/components/Standings/ConstructorStanding/ConstructorStanding";
import DriverStandings from "@/components/Standings/DriverStanding/DriverStanding";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import TabSelector from "@/components/ui/TabSelector";
import useFetch from "@/hooks/useFetch";
import {Fragment, useEffect, useState} from "react";

const test = () => {
  const [displayCategory, setDisplayCategory] = useState("driver");
  const modeHandler = (modeSelected) => {
    setDisplayCategory(modeSelected);
  };

  const selectorData = ["driver", "constructor"];

  const {data, loading, error} = useFetch(
    "http://ergast.com/api/f1/current/last/results",
    "raceData"
  );
  console.log(data);

  return <Fragment>{loading && <LoadingSpinner />}</Fragment>;
};
export default test;
