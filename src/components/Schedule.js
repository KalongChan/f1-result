import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
var convert = require("xml-js");

const Schedule = ({raceInfo}) => {
  const [loaded, setLoaded] = useState(false);
  const [schedule, setSchedule] = useState();
  const [parseRaceTime, setParseRaceTime] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    fetchData();
  }, [loaded]);

  const fetchData = async () => {
    const res = await axios.get("http://ergast.com/api/f1/current");
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const data = json.MRData.RaceTable.Race;
    const parseRaceTime = [];
    data.map((race) => {
      parseRaceTime.push(Date.parse(new Date(race.Date._text)));
    });
    setSchedule(data);
    setParseRaceTime(parseRaceTime);
  };

  const handleClick = (time, race) => {
    if (time > Date.now()) {
      return;
    }
    router.push(
      `/results?year=${race._attributes.season}&round=${race._attributes.round}`
    );
  };

  const isActive = (index) => {
    return index === router.query.round - 1 || index === raceInfo?.round - 1;
  };

  return (
    <div className="schedule">
      {schedule?.map((race, index) => (
        <div
          className={`schedule__race${
            parseRaceTime[index] > Date.now() ? "--coming-race" : ""
          }${isActive(index) ? "--actived" : ""}`}
          key={index}
          onClick={() => handleClick(parseRaceTime[index], race)}
        >
          <div className="schedule__race-flag">
            <img
              src={`countryflags/${race.Circuit.Location.Country._text}.svg`}
              alt=""
            />
          </div>
          <div className="schedule__race-info">
            <div className="schedule__race-title">{race.RaceName._text}</div>
            <div className="schedule__race-date">{race.Date._text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
