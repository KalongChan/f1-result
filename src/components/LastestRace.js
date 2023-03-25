import axios from "axios";
var convert = require("xml-js");
import "/node_modules/flag-icons/css/flag-icons.min.css";
var nationalities = require("i18n-nationality");
nationalities.registerLocale(require("i18n-nationality/langs/en.json"));

import Table from "@/utils/Table";
import {useMemo, useState, useEffect} from "react";

const LastestRace = () => {
  const [loaded, setLoaded] = useState(false);
  const [raceInfoState, setRaceInfoState] = useState({});
  const [raceResultState, setRaceResultState] = useState([]);

  let raceResult = [];
  const fetchData = async () => {
    const res = await axios.get(
      "http://ergast.com/api/f1/current/last/results"
    );
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const data = json.MRData.RaceTable.Race;

    if (data) {
      data.ResultsList.Result.map((result) => {
        raceResult.push({
          position: result._attributes.position,
          number: result._attributes.number,
          nationality: `${
            result.Driver.Nationality._text === "Monegasque"
              ? "MC"
              : nationalities.getAlpha2Code(
                  result.Driver.Nationality._text,
                  "en"
                )
          }`,
          driver: {
            nationality: `${
              result.Driver.Nationality._text === "Monegasque"
                ? "MC"
                : nationalities.getAlpha2Code(
                    result.Driver.Nationality._text,
                    "en"
                  )
            }`,
            driver: `${result.Driver.GivenName._text} ${result.Driver.FamilyName._text}`,
          },
          constructor: result.Constructor.Name._text,
          laps: result.Laps._text,
          time: `${result.Time ? result.Time._text : "DNF"}`,
          points: result._attributes.points,
        });
      });
      setRaceResultState(raceResult);
      setRaceInfoState({
        raceName: data.RaceName._text,
        circuit: data.Circuit.CircuitName._text,
        country: data.Circuit.Location.Country._text,
        location: data.Circuit.Location.Locality._text,
        lat: data.Circuit.Location._attributes.lat,
        long: data.Circuit.Location._attributes.long,
        date: data.Date._text,
      });
    }
  };

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    fetchData();
  }, [loaded]);

  const data = useMemo(() => raceResultState, [raceResultState]);

  const columns = useMemo(
    () => [
      {
        Header: "Pos",
        accessor: "position",
      },
      {
        Header: "No",
        accessor: "number",
      },
      {
        Header: "Driver",
        accessor: "driver",
        Cell: ({row}) => (
          <div className="driver">
            <span
              className={`fi fi-${row.values.driver.nationality.toLowerCase()}`}
            ></span>
            <span>{`${row.values.driver.driver}`}</span>
          </div>
        ),
      },
      {
        Header: "Constructor",
        accessor: "constructor",
      },
      {
        Header: "Laps",
        accessor: "laps",
      },
      {
        Header: "Time/DNF",
        accessor: "time",
      },
      {
        Header: "Points",
        accessor: "points",
      },
    ],
    []
  );

  return (
    <div className="race__container">
      <div className="race__info">
        <div className="race__info-racename">{raceInfoState.raceName}</div>
        <div className="race__info-circuit">{raceInfoState.circuit}</div>
        <div className="race__info-date">{raceInfoState.date}</div>
        <div className="race__info-location">
          {raceInfoState.location},{raceInfoState.country} {raceInfoState.lat},
          {raceInfoState.long}
        </div>
      </div>
      <div className="race__result">
        <Table columns={columns} data={[...data]} />
      </div>
    </div>
  );
};
export default LastestRace;
