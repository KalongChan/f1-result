import RaceResultTable from "@/components/RaceResultTable";
import axios from "axios";
var convert = require("xml-js");
import {useRouter} from "next/router";
import {useState, useEffect, Fragment} from "react";
import raceDataProcessing from "@/utils/raceDataProcessing";
import Schedule from "@/components/Schedule";
import LoadingSpinner from "@/components/LoadingSpinner";

const Race = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [isFetching, setIsFetching] = useState(false);
  const [raceInfo, setRaceInfo] = useState();
  const [raceResult, setRaceResult] = useState();
  const router = useRouter();
  const {year, round} = router.query;

  const fetchData = async () => {
    if (year && round) {
      // setIsFetching(true);
      const res = await axios.get(
        `http://ergast.com/api/f1/${year}/${round}/results`
      );
      var options = {compact: true, ignoreComment: true, spaces: 4};
      const json = convert.xml2js(res.data, options);
      const fetchedData = json.MRData.RaceTable.Race;
      const formattedData = raceDataProcessing(fetchedData);
      setRaceInfo(formattedData.raceInfo);
      setRaceResult(formattedData.raceResult);
      // setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
      return;
    }
    fetchData();
  }, [firstRender, year, round]);

  // console.log(raceResult);
  // console.log(raceInfo);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (!raceInfo || !raceResult || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="race__container">
      <RaceResultTable raceResult={raceResult} raceInfo={raceInfo} />
      {year === new Date().getFullYear().toString() && (
        <Schedule raceInfo={raceInfo} enableFetch={true} />
      )}
    </div>
  );
};
export default Race;
