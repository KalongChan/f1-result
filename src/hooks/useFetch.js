import {useState, useEffect} from "react";
import axios from "axios";
import raceDataFormatter from "@/utils/raceDataFormatter";
import scheduleTimeFormatter from "@/utils/scheduleTimeFormatter";
import driverStandingsDataFormatter from "@/utils/driverStandingsDataFormatter";
import constructorStandingDataFormatter from "@/utils/constructorStandingDataFormatter";
var convert = require("xml-js");

const useFetch = (url, args) => {
  const [data, setData] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    fetchData();
    return () => clearTimeout(timer);
  }, [url, isFirstRender]);

  const fetchData = async () => {
    try {
      let formattedData = null;
      let formattedTime = null;
      let fetchedData = null;
      let json = null;

      const res = await axios.get(url);
      var options = {compact: true, ignoreComment: true, spaces: 4};
      json = convert.xml2js(res.data, options);

      if (args === "raceData" || args === "schedule") {
        fetchedData = json.MRData.RaceTable.Race;
      } else if (args === "driver" || args === "constructor") {
        fetchedData = json.MRData.StandingsTable.StandingsList;
      } else {
        setError(true);
        return;
      }

      switch (args) {
        case "raceData":
          formattedData = raceDataFormatter(fetchedData);
          setData({
            raceInfo: formattedData.raceInfo,
            raceResult: formattedData.raceResult,
          });
          return;

        case "schedule":
          formattedTime = scheduleTimeFormatter(fetchedData);
          setData({schedule: fetchedData, parseRaceTime: formattedTime});
          return;

        case "driver":
          formattedData = driverStandingsDataFormatter(fetchedData);
          setData(formattedData);
          return;

        case "constructor":
          formattedData = constructorStandingDataFormatter(fetchedData);
          setData(formattedData);
          return;

        default:
          setError(true);
      }
    } catch (e) {
      setError(true);
    }
  };
  return {data, loading, error};
};

export default useFetch;
