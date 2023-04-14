import constructorStandingDataFormatter from "@/utils/constructorStandingDataFormatter";
import axios from "axios";
var convert = require("xml-js");

import {useState, useEffect} from "react";
import ConstructorStandingTable from "./ConstructorStandingTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import raceDataFormatter from "@/utils/raceDataFormatter";
import useFetch from "@/hooks/useFetch";

const DriverStandings = () => {
  const [firstRender, setFirstRender] = useState(false);

  const {
    data: constructorStandingData,
    loading: constructorStandingLoading,
    error: constructorStandingError,
  } = useFetch(
    "http://ergast.com/api/f1/current/constructorStandings",
    "constructor"
  );

  const {
    data: lastestRaceData,
    loading: lastestRaceLoading,
    error: lastestRaceError,
  } = useFetch("http://ergast.com/api/f1/current/last/results", "raceData");

  if (
    !constructorStandingData ||
    !lastestRaceData ||
    constructorStandingLoading ||
    lastestRaceLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <ConstructorStandingTable
      standings={constructorStandingData.constructorStanding}
      lastUpdated={lastestRaceData.raceInfo}
    />
  );
};
export default DriverStandings;
