import "/node_modules/flag-icons/css/flag-icons.min.css";
import {Fragment, useMemo} from "react";
import Table from "@/utils/Table";

const DriverStandingsTable = ({standings, lastUpdated}) => {
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
        Header: "Wins",
        accessor: "wins",
        Cell: ({row}) => (
          <div className="race__result-laps">{row.values.wins}</div>
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
  return (
    <Fragment>
      <Table columns={columns} data={[...standings]} />
      <div className="standing__lastupdated">
        As of Season {lastUpdated.season} Round {lastUpdated.round}
      </div>
    </Fragment>
  );
};
export default DriverStandingsTable;
