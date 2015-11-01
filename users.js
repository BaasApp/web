var Users;
(function () {
  var me;
  var meId;
  var getMeInterval;

  Users = function () {

  };

  Users.prototype.register = function (callback) {
    $.post(server + "users", {name: 'frankygoboom', push_register_id: ''}, function () {
      // set the following in an id: arguments[0].id;
      docCookies.setItem('meId', arguments[0].id);
      callback();
    });
  };

  Users.getAll = function () {
    clearInterval(getMeInterval);
    me = null;

    $.getJSON(server + "users", function (data) {
      data.forEach(function (item) {
        if (!item.updates.length) {
          return;
        }
        var latlng = [item.updates[0].latitude, item.updates[0].longitude]
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

  var createOrUpdateMe = function (latlng) {
    meId = docCookies.getItem('meId');
    if (!me) {
      var callback = function () {
        meId = docCookies.getItem('meId');
        me = createActor(latlng, {marker: 'customer'}).addTo(map);
        me.id = meId;
        $.getJSON(server + "users/" + me.id, function (data) {
          Gauge._beer = data.beer_count;
          Gauge._calories = data.calories;
          Gauge.update();
        });
      };
      if (!meId) {
        var user = new Users();
        user.register(callback);
      } else {
        callback();
      }
    } else {
      $.post(server + "users/" + me.id + "/update", {latitude: latlng[0], longitude: latlng[1]});
      $.getJSON(server + "users/" + me.id, function (data) {
        Gauge._beer = data.beer_count;
        Gauge._calories = data.calories;
        Gauge.update();
      });
      move(me, latlng);
    }
  };

  Users.getMe = function () {
    getLocation(function (geo) {
      latlng = [geo.coords.latitude, geo.coords.longitude];
      createOrUpdateMe(latlng);
    })
  };

  Users.intervalGetMe = function () {
    Users.getMe();
    getMeInterval = setInterval(function () {
      Users.getMe();
    }, 10000);
  };

  Users.postHealth = function(email, password, callback) {
    meId = docCookies.getItem('meId');
    $.post(server + "users/" + meId + "/health", {email: email, password: password}, callback);
  };

})();

Users.intervalGetMe();
// var user = new Users();
// user.register();
