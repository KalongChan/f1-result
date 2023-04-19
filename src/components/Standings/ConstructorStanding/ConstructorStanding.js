import constructorStandingDataFormatter from "@/utils/constructorStandingDataFormatter";
import axios from "axios";
var convert = require("xml-js");

import ConstructorStandingTable from "./ConstructorStandingTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Error/Error";

const DriverStandings = () => {
  const {
    data: constructorStandingData,
    loading: constructorStandingLoading,
    error: constructorStandingError,
  } = useFetch(
    "https://ergast.com/api/f1/current/constructorStandings",
    "constructor"
  );

  const {
    data: lastestRaceData,
    loading: lastestRaceLoading,
    error: lastestRaceError,
  } = useFetch("https://ergast.com/api/f1/current/last/results", "raceData");

  if (constructorStandingError || lastestRaceError) {
    return <Error />;
  }

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
