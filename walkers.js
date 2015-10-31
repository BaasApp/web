var actors = [];

var createActor = function (latlong, params) {
  if (!params) params = {};
  var type = params.marker || 'beerTender';
  var icon;
  if (type == 'beerTender') {
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
  } else if (type == 'customer') {
    var icon =  L.mapbox.marker.icon({
      "marker-color": "#1087bf",
      "marker-size": "large",
      "marker-symbol": "heart",
    });
  }

  var marker = L.marker(latlong, {icon: icon});
  marker.type = type;
  actors.push(marker);
  return marker;
};

var beerCloseAlert = function() {
  alert('the beer is appon thee, revel in its magnificance!');
};

var throttledBeerCloseAlert = _.throttle(beerCloseAlert, 15000, {trailing: false});

var move = function (marker, latlong) {
  marker.setLatLng(latlong);
  if (trackMovement) {
    (marker.type == 'beerTender' ? beerHeat : customerHeat).addLatLng(latlong);
  }

  actors.forEach(function (actor, i) {
    if (actor.getLatLng().equals(marker.getLatLng())) {
      return;
    }
    if (marker.type === actor.type) {
      return;
    }
    var distance = actor.getLatLng().distanceTo(marker.getLatLng());
    if (distance < 5) {
      setTimeout(throttledBeerCloseAlert, 300);
    }
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
  // marker.on('move', function () { console.log('hi', arguments, this); });

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
