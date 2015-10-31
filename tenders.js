var Tenders;
(function () {
  var tempRanges = [[-1000, 'cold'], [10, 'mid'], [999, 'warm']];

  Tenders = function () {

  };

  var temperatureWordFromCelcius = function (temperature) {
    for (var i = 0; i < tempRanges.length; i++) {
      if (tempRanges[i][0] < temperature && tempRanges[i+1[0]] > temperature) {
        var temp = tempRanges[i][1];
        break;
      }
    }
  };

  Tenders.getAll = function () {
    $.getJSON(server + "beer_tenders", function (data) {
      data.forEach(function (item) {
        var latlng = [item.last_update.latitude, item.last_update.longitude]
        var temperature = temperatureWordFromCelcius(item.last_update.temperature);

        var actor = _.findWhere(actors, {id: item.id, type: 'beerTender'});
        if (actor) {
          move(actor, latlng);
        } else {
          actor = createActor(latlng, {marker: 'beerTender', temp: temperature});
          actor.id = item.id;
          actor.addTo(map);
        }
      })
    });
  };
})();

Tenders.getAll();

setInterval(function () {
  Tenders.getAll();
}, 2000);

// var user = new Users();
// user.register();
