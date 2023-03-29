import "/node_modules/flag-icons/css/flag-icons.min.css";
import {useMemo, useState} from "react";
import Table from "@/utils/Table";

const RaceResultTable = ({raceInfo, raceResult}) => {
  const [isMyTime, setIsMyTime] = useState(true);
  const setMyTime = () => {
    setIsMyTime(true);
  };
  const setTrackTime = () => {
    setIsMyTime(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Pos",
        accessor: "position",
        Cell: ({row}) => (
          <div className="race__result-position">{row.values.position}</div>
        ),
      },
      {
        Header: "No",
        accessor: "number",
        Cell: ({row}) => (
          <div className="race__result-number">{row.values.number}</div>
        ),
      },
      {
        Header: "Driver",
        accessor: "driver",
        Cell: ({row}) => (
          <div className="race__result-driver">
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
        Cell: ({row}) => (
          <div className="race__result-constructor">
            {row.values.constructor}
          </div>
        ),
      },
      {
        Header: "Laps",
        accessor: "laps",
        Cell: ({row}) => (
          <div className="race__result-laps">{row.values.laps}</div>
        ),
      },
      {
        Header: "Time/Status",
        accessor: "time",
        Cell: ({row}) => (
          <div className="race__result-time">{row.values.time}</div>
        ),
      },
      {
        Header: "Points",
        accessor: "points",
        Cell: ({row}) => (
          <div className="race__result-points">{row.values.points}</div>
        ),
      },
    ],
    []
  );

  // if (!raceInfo) {
  //   return;
  // }

  const date = new Date(Date.parse(`${raceInfo.date} ${raceInfo.time}`));
  const month = date.getMonth() + 1;
  const localDate = `${date.getFullYear().toString().padStart(2, 0)}-${month
    .toString()
    .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  const localTime = `${date.getHours().toString().padStart(2, 0)}:${date
    .getMinutes()
    .toString()
    .padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`;
  console.log(raceInfo);

  return (
    <div className="race">
      <div className="race__info">
        <div className="race__info-racename">{raceInfo?.raceName}</div>
        <div className="race__info-circuit">{raceInfo?.circuit}</div>
        <div className="race__info-racetime-wrapper">
          <div className="race__info-racetime">
            {isMyTime
              ? `${localDate} ${localTime}`
              : `${raceInfo?.date} ${raceInfo?.time?.replace("Z", "")}`}
          </div>
          <div
            onClick={setMyTime}
            className={`race__info-racetime-timebutton${
              isMyTime ? "--active" : ""
            }`}
          >
            My Time
          </div>
          <div
            onClick={setTrackTime}
            className={`race__info-racetime-timebutton${
              !isMyTime ? "--active" : ""
            }`}
          >
            Track Time
          </div>
        </div>
        <div className="race__info-location">
          {raceInfo?.location},{raceInfo?.country} {raceInfo?.lat},
          {raceInfo?.long}
        </div>
      </div>
      <div className="race__result">
        <Table columns={columns} data={[...raceResult]} />
      </div>
    </div>
  );
};
export default RaceResultTable;
