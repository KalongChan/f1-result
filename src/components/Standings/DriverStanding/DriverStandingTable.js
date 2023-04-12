import "/node_modules/flag-icons/css/flag-icons.min.css";
import {Fragment, useMemo} from "react";
import Table from "@/components/ui/Table";

const DriverStandingTable = ({standings, lastUpdated}) => {
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
        Header: "Wins",
        accessor: "wins",
        Cell: ({row}) => row.values.wins,
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
    <Fragment>
      <Table columns={columns} data={[...standings]} type={"standing__table"} />
      <div className="standing__lastupdated">
        Last updated: {lastUpdated.date}
      </div>
    </Fragment>
  );
};
export default DriverStandingTable;
