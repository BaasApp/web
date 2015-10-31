var Users;
(function () {

  Users = function () {

  };

  Users.prototype.register = function () {
    $.post(server + "users", {name: 'frankygoboom', push_register_id: ''}, function () {
      console.log(arguments);
      // set the following in an id: arguments[0].id;
    });
  };

  Users.getAll = function () {
    $.getJSON(server + "users", function (data) {
      data.forEach(function (item) {
        var latlng = [item.last_update.latitude, item.last_update.longitude]
        var actor = _.findWhere(actors, {id: item.id, type: 'customer'});
        if (actor) {
          move(actor, latlng);
        } else {
          actor = createActor(latlng, {marker: 'customer'});
          actor.id = item.id;
          actor.addTo(map);
        }
      })
    });
  };

  var getLocation = function (callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  };

  var me;
  var createOrUpdateMe = function (latlng) {
    if (!me) {
      // TODO: enable the follwing
      // var user = new Users();
      // user.register();

      me = createActor(latlng, {marker: 'customer'}).addTo(map);
    } else {
      // TODO: post my loc to the server
      move(me, latlng);
    }
  };

  Users.getMe = function () {
    getLocation(function (geo) {
      latlng = [geo.coords.latitude, geo.coords.longitude];
      createOrUpdateMe(latlng);
    })
  };

})();

setInterval(function () {
  Users.getMe();
}, 2000);

// var user = new Users();
// user.register();
