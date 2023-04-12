const constructorStandingDataFormatter = (data) => {
  let constructorStanding = [];
  let seasonInfo = {};
  if (data) {
    data.ConstructorStanding.map((result) => {
      constructorStanding.push({
        position: result._attributes.position,
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
  return {constructorStanding, seasonInfo};
};
export default constructorStandingDataFormatter;
