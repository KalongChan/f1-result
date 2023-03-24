import axios from "axios";
import {useEffect, useState} from "react";
var convert = require("xml-js");

const Schedule = () => {
  const [loaded, setLoaded] = useState(false);
  const [schedule, setSchedule] = useState();
  const [parseRaceTime, setParseRaceTime] = useState();

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

  return (
    <div className="container">
      <div className="schedule">
        {schedule?.map((race, index) => (
          <div
            className={`schedule__race${
              parseRaceTime[index] > Date.now() ? "--coming-race" : ""
            }${index === 1 ? "--actived" : ""}`}
            key={index}
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
    </div>
  );
};

export default Schedule;
