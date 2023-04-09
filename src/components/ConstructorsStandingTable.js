import "/node_modules/flag-icons/css/flag-icons.min.css";
import {Fragment, useMemo} from "react";
import Table from "@/utils/Table";

const ConstructorsStandingTable = ({standings, lastUpdated}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Pos",
        accessor: "position",
        Cell: ({row}) => row.values.position,
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
export default ConstructorsStandingTable;
