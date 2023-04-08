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

  // if (!raceInfo) {
  //   return;
  // }

  // const date = new Date(Date.parse(`${raceInfo.date} ${raceInfo.time}`));
  // const month = date.getMonth() + 1;
  // const localDate = `${date.getFullYear().toString().padStart(2, 0)}-${month
  //   .toString()
  //   .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  // const localTime = `${date.getHours().toString().padStart(2, 0)}:${date
  //   .getMinutes()
  //   .toString()
  //   .padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`;
  // console.log(raceInfo);

  return (
    // <div className="race">
    // <div className="race__info">
    //   <div className="race__info-racename">{raceInfo?.raceName}</div>
    //   <div className="race__info-circuit">{raceInfo?.circuit}</div>
    //   <div className="race__info-racetime-wrapper">
    //     <div className="race__info-racetime">
    //       {isMyTime
    //         ? `${localDate} ${localTime}`
    //         : `${raceInfo?.date} ${raceInfo?.time?.replace("Z", "")}`}
    //     </div>
    //     <div
    //       onClick={setMyTime}
    //       className={`race__info-racetime-timebutton${
    //         isMyTime ? "--active" : ""
    //       }`}
    //     >
    //       My Time
    //     </div>
    //     <div
    //       onClick={setTrackTime}
    //       className={`race__info-racetime-timebutton${
    //         !isMyTime ? "--active" : ""
    //       }`}
    //     >
    //       Track Time
    //     </div>
    //   </div>
    //   <div className="race__info-location">
    //     {raceInfo?.location},{raceInfo?.country} {raceInfo?.lat},
    //     {raceInfo?.long}
    //   </div>
    // </div>
    <div className="race__result">
      <Table columns={columns} data={[...raceResult]} />
    </div>
    // {/* </div> */}
  );
};
export default RaceResultTable;
