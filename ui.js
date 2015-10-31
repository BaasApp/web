var trackMovement = false;
var killAlerts = true;
(function () {
  var allUsers = false;

  document.addEventListener("DOMContentLoaded", function(event) {
    var controlsDisplay = false;
    var toggleMenu = function () {
      var menu = document.getElementsByClassName('menu')[0];
      if (menu.style.display == 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
      }
    };

    document.getElementsByClassName('branding')[0].onclick = toggleMenu;

    document.getElementsByClassName('toggleHeat')[0].onclick = function () {
      trackMovement = !trackMovement;
      toggleMenu();
    };

    document.getElementsByClassName('toggleAlerts')[0].onclick = function () {
      killAlerts = !killAlerts;
      toggleMenu();
    };

    var usersInterval;
    document.getElementsByClassName('toggleAllUsers')[0].onclick = function () {
      allUsers = !allUsers;
      if (allUsers) {
        usersInterval = setInterval(function () {
          Users.getAll();
        }, 2000);
      } else {
        clearInterval(usersInterval);
        var customers = _.where(actors, {type: 'customer'});
        customers.forEach(function (item) {
          map.removeLayer(item);
        })
        // TODO: add my location
      }
      toggleMenu();
    };

    document.getElementsByClassName('wipeHeat')[0].onclick = function () {
      trackMovement = false;
      customerHeat.setLatLngs([]);
      beerHeat.setLatLngs([]);
      toggleMenu();
    };
  });
})()
