import RaceResult from "@/components/RaceResult";
import axios from "axios";
var convert = require("xml-js");
import {useRouter} from "next/router";
import {useState, useEffect, Fragment} from "react";
import raceData from "@/utils/raceData";
import Schedule from "@/components/Schedule";

const Race = () => {
  const [loaded, setLoaded] = useState(false);
  const [raceInfo, setRaceInfo] = useState({});
  const [raceResult, setRaceResult] = useState([]);
  const router = useRouter();
  const {year, round} = router.query;

  const fetchData = async () => {
    if (year && round) {
      const res = await axios.get(
        `http://ergast.com/api/f1/${year}/${round}/results`
      );
      var options = {compact: true, ignoreComment: true, spaces: 4};
      const json = convert.xml2js(res.data, options);
      const fetchedData = json.MRData.RaceTable.Race;
      const formattedData = raceData(fetchedData);
      setRaceInfo(formattedData.raceInfo);
      setRaceResult(formattedData.raceResult);
    }
  };

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    fetchData();
  }, [loaded, year, round]);

  // console.log(raceResult);
  // console.log(raceInfo);

  return (
    <Fragment>
      <RaceResult raceResult={raceResult} raceInfo={raceInfo} />;
      {year === new Date().getFullYear().toString() && (
        <Schedule raceInfo={raceInfo} />
      )}
    </Fragment>
  );
};
export default Race;
