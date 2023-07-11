import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
var convert = require("xml-js");

const Schedule = ({
  raceInfo,
  schedule,
  parseRaceTime,
  enableFetch,
  resetLoading,
  resetDisplayCategory,
}) => {
  const [firstRender, setFirstRender] = useState(false);
  const [selfFetchSchedule, setSelfFetchSchedule] = useState();
  const [selfFetchParaseRaceTime, setSelfFetchParaseRaceTime] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
      return;
    }
    if (enableFetch) {
      fetchData();
    }
  }, [firstRender]);

  const fetchData = async () => {
    const res = await axios.get("https://ergast.com/api/f1/current");
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const json = convert.xml2js(res.data, options);
    const data = json.MRData.RaceTable.Race;
    const parseRaceTime = [];
    data.map((race) => {
      parseRaceTime.push(Date.parse(new Date(race.Date._text)));
    });
    setSelfFetchSchedule(data);
    setSelfFetchParaseRaceTime(parseRaceTime);
  };

  const handleClick = (time, race) => {
    if (time > Date.now()) {
      return;
    }
    if (resetLoading) {
      resetLoading();
    }
    if (resetDisplayCategory) {
      resetDisplayCategory();
    }
  };

  const isActive = (index) => {
    return index === router.query.round - 1 || index === raceInfo?.round - 1;
  };

  const convertLocalTime = (raceDate, raceTime) => {
    const date = new Date(Date.parse(`${raceDate} ${raceTime}`));
    const month = date.getMonth() + 1;
    const localDate = `${date.getFullYear().toString().padStart(2, 0)}-${month
      .toString()
      .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
    const localTime = `${date.getHours().toString().padStart(2, 0)}:${date
      .getMinutes()
      .toString()
      .padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`;

    return {localDate, localTime};
  };

  if (enableFetch) {
    return (
      <div className="schedule__container">
        <div className="schedule">
          {selfFetchSchedule?.map((race, index) => (
            <div
              className={`schedule__race${
                selfFetchParaseRaceTime[index] > Date.now()
                  ? "--coming-race"
                  : ""
              }${
                isActive(index) && selfFetchParaseRaceTime[index] < Date.now()
                  ? "--actived"
                  : ""
              }`}
              key={index}
              onClick={() => handleClick(selfFetchParaseRaceTime[index], race)}
            >
              <Link
                href={`/results?year=${race._attributes.season}&round=${race._attributes.round}`}
              >
                <div className="schedule__race-flag">
                  <img
                    src={`countryflags/${race.Circuit.Location.Country._text}.svg`}
                    alt=""
                  />
                </div>
                <div className="schedule__race-info">
                  <div className="schedule__race-title">
                    {race.RaceName._text}
                  </div>
                  <div className="schedule__race-date">
                    {
                      convertLocalTime(race?.Date._text, race?.Time._text)
                        .localDate
                    }
                  </div>
                  <div className="schedule__race-time">
                    {
                      convertLocalTime(race?.Date._text, race?.Time._text)
                        .localTime
                    }
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="schedule__container">
      <div className="schedule">
        {schedule?.map((race, index) => (
          <div
            className={`schedule__race${
              parseRaceTime[index] > Date.now() ? "--coming-race" : ""
            }${isActive(index) ? "--actived" : ""}`}
            key={index}
            onClick={() => handleClick(parseRaceTime[index], race)}
          >
            <Link
              href={`/results?year=${race._attributes.season}&round=${race._attributes.round}`}
            >
              <div className="schedule__race-flag">
                <img
                  src={`countryflags/${race.Circuit.Location.Country._text}.svg`}
                  alt=""
                />
              </div>
              <div className="schedule__race-info">
                <div className="schedule__race-title">
                  {race.RaceName._text}
                </div>
                <div className="schedule__race-date">
                  {
                    convertLocalTime(race.Date?._text, race.Time?._text)
                      .localDate
                  }
                </div>
                <div className="schedule__race-time">
                  {
                    convertLocalTime(race.Date?._text, race.Time?._text)
                      .localTime
                  }
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
