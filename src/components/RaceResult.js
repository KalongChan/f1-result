import "/node_modules/flag-icons/css/flag-icons.min.css";
import {useMemo} from "react";
import Table from "@/utils/Table";

const RaceResult = ({raceInfo, raceResult}) => {
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
        Header: "Time/Status",
        accessor: "time",
      },
      {
        Header: "Points",
        accessor: "points",
      },
    ],
    []
  );

  const date = new Date(Date.parse(`${raceInfo.date} ${raceInfo.time}`));
  const localTime = `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`;

  return (
    <div className="race__container">
      <div className="race__info">
        <div className="race__info-racename">{raceInfo.raceName}</div>
        <div className="race__info-circuit">{raceInfo.circuit}</div>
        <div className="race__info-date">{raceInfo.date}</div>
        <div className="race__info-time">{raceInfo.time}</div>
        <div className="race__info-time">
          {raceInfo.time && `${localTime} Converted to your local time`}
        </div>
        <div className="race__info-location">
          {raceInfo.location},{raceInfo.country} {raceInfo.lat},{raceInfo.long}
        </div>
      </div>
      <div className="race__result">
        <Table columns={columns} data={[...raceResult]} />
      </div>
    </div>
  );
};
export default RaceResult;
