var nationalities = require("i18n-nationality");
nationalities.registerLocale(require("i18n-nationality/langs/en.json"));

const driverStandingsDataFormatter = (data) => {
  let driverStandings = [];
  let seasonInfo = {};
  if (data) {
    data.DriverStanding.map((result) => {
      driverStandings.push({
        position: result._attributes.position,
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
        wins: result._attributes.wins,
        points: result._attributes.points,
      });
    });

    seasonInfo = {
      season: data._attributes.season,
      round: data._attributes.round,
    };
  }
  return {driverStandings, seasonInfo};
};
export default driverStandingsDataFormatter;
