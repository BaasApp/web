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
})();



// var user = new Users();
// user.register();
