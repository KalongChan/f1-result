const scheduleTimeFormatter = (data) => {
  const formattedScheduleTime = [];
  data.map((race) => {
    formattedScheduleTime.push(Date.parse(new Date(race.Date._text)));
  });
  return formattedScheduleTime;
};

export default scheduleTimeFormatter;
