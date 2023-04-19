import DriverStandingTable from "./DriverStandingTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Error/Error";

const DriverStandings = () => {
  const {
    data: driverStandingData,
    loading: driverStandingLoading,
    error: driverStandingError,
  } = useFetch("https://ergast.com/api/f1/current/driverStandings", "driver");

  const {
    data: lastestRaceData,
    loading: lastestRaceLoading,
    error: lastestRaceError,
  } = useFetch("https://ergast.com/api/f1/current/last/results", "raceData");

  if (driverStandingError || lastestRaceError) {
    return <Error />;
  }

  if (
    !driverStandingData ||
    !lastestRaceData ||
    driverStandingLoading ||
    lastestRaceLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <DriverStandingTable
      standings={driverStandingData.driverStandings}
      lastUpdated={lastestRaceData.raceInfo}
    />
  );
};
export default DriverStandings;
