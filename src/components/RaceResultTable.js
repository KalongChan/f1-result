import "/node_modules/flag-icons/css/flag-icons.min.css";
import {Fragment, useMemo, useState} from "react";
import Table from "@/utils/Table";

const RaceResultTable = ({raceInfo, raceResult}) => {
  // const [isMyTime, setIsMyTime] = useState(true);
  // const setMyTime = () => {
  //   setIsMyTime(true);
  // };
  // const setTrackTime = () => {
  //   setIsMyTime(false);
  // };

  const columns = useMemo(
    () => [
      {
        Header: "Pos",
        accessor: "position",
        Cell: ({row}) => row.values.position,
      },
      {
        Header: "No",
        accessor: "number",
        Cell: ({row}) => row.values.number,
      },
      {
        Header: "Driver",
        accessor: "driver",
        Cell: ({row}) => (
          <Fragment>
            <span
              className={`fi fi-${row.values.driver.nationality.toLowerCase()}`}
            ></span>
            <span>{`${row.values.driver.driver}`}</span>
          </Fragment>
        ),
      },
      {
        Header: "Constructor",
        accessor: "constructor",
        Cell: ({row}) => row.values.constructor,
      },
      {
        Header: "Laps",
        accessor: "laps",
        Cell: ({row}) => row.values.laps,
      },
      {
        Header: "Time/Status",
        accessor: "time",
        Cell: ({row}) => row.values.time,
      },
      {
        Header: "Points",
        accessor: "points",
        Cell: ({row}) => row.values.points,
      },
    ],
    []
  );

  return (
    <div className="race__result">
      <Table columns={columns} data={[...raceResult]} type={"race__result"} />
    </div>
  );
};
export default RaceResultTable;
