import {useState} from "react";

const RaceInfo = ({raceInfo}) => {
  const [isMyTime, setIsMyTime] = useState(true);
  const setMyTime = () => {
    setIsMyTime(true);
  };
  const setTrackTime = () => {
    setIsMyTime(false);
  };

  const date = new Date(Date.parse(`${raceInfo.date} ${raceInfo.time}`));
  const month = date.getMonth() + 1;
  const localDate = `${date.getFullYear().toString().padStart(2, 0)}-${month
    .toString()
    .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  const localTime = `${date.getHours().toString().padStart(2, 0)}:${date
    .getMinutes()
    .toString()
    .padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`;

  return (
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
        {raceInfo?.location},&nbsp;{raceInfo?.country}
      </div>
    </div>
  );
};
export default RaceInfo;
