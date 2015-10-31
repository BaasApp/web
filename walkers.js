var actors = [];

var createActor = function (latlong, params) {
  if (!params) params = {};
  var marker = params.marker || 'beerTender';
  var icon;
  if (marker == 'beerTender') {
    var tempColors = {
      cold: "#a3e46b",
      medium: "#f1f075",
      warm: "#f5c272"
    }
    var tempColor = tempColors[params.temp || "medium"];
    var icon =  L.mapbox.marker.icon({
      "marker-color": tempColor,
      "marker-size": "small",
      "marker-symbol": "beer",
    });
  } else if (marker == 'customer') {
    var icon =  L.mapbox.marker.icon({
      "marker-color": "#1087bf",
      "marker-size": "large",
      "marker-symbol": "heart",
    });
  }

  var marker = L.marker(latlong, {icon: icon});
  actors.push(marker);
  return marker;
};

var move = function (marker, latlong) {
  marker.setLatLng(latlong);

  actors.forEach(function (actor, i) {
    if (actor.getLatLng().equals(marker.getLatLng())) {
      
    }
    var distance = actor.getLatLng().distance(marker.getLatLng());
  });
};

var walk = function (coords, map, params) {
  if (!params) params = {};
  var isLoop = params.isLoop;
  var modifier = params.modifier || [0,0];

  var buildSequence = function(coords) {
    return _.clone(coords).concat(_.clone(coords).reverse());
  }

  var speed = 1000;
  var sequence = buildSequence(coords);

  var latlong = sequence.pop();
  var marker = createActor([latlong[0] + modifier[0], latlong[1] + modifier[1]], params).addTo(map);
  marker.on('move', function () { console.log('hi', arguments, this); });

  var interval = setInterval(function () {
    latlong = sequence.pop();
    if (!latlong) {
      if (isLoop) {
        sequence = buildSequence(coords);
        latlong = sequence.pop();
      } else {
        clearInterval(interval);
        return;
      }
    }

    if (modifier) {
      latlong = [latlong[0] + modifier[0], latlong[1] + modifier[1]];
    }

    move(marker, latlong);

  }, speed);

}
