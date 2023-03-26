var nationalities = require("i18n-nationality");
nationalities.registerLocale(require("i18n-nationality/langs/en.json"));

const raceDataProcessing = (data) => {
  let raceResult = [];
  let raceInfo = {};
  if (data) {
    data.ResultsList.Result.map((result) => {
      raceResult.push({
        position: result._attributes.position,
        number: result._attributes.number,
        driver: {
          nationality: `${
            result.Driver.Nationality._text === "Monegasque"
              ? "MC"
              : result.Driver.Nationality._text === "Argentine"
              ? "AR"
              : nationalities.getAlpha2Code(
                  result.Driver.Nationality._text,
                  "en"
                )
          }`,
          driver: `${result.Driver.GivenName._text} ${result.Driver.FamilyName._text}`,
        },
        constructor: result.Constructor.Name._text,
        laps: result.Laps._text,
        time: `${result.Time ? result.Time._text : result.Status._text}`,
        points: result._attributes.points,
      });
    });
    raceInfo = {
      raceName: data.RaceName._text,
      circuit: data.Circuit.CircuitName._text,
      country: data.Circuit.Location.Country._text,
      location: data.Circuit.Location.Locality._text,
      lat: data.Circuit.Location._attributes.lat,
      long: data.Circuit.Location._attributes.long,
      date: data.Date._text,
      time: data.Time?._text,
      season: data._attributes.season,
      round: data._attributes.round,
    };
  }
  return {raceResult, raceInfo};
};
export default raceDataProcessing;
