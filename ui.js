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

    document.getElementsByClassName('goToMe')[0].onclick = function () {
      navigator.geolocation.getCurrentPosition(function (geo) {
        var latlng = [geo.coords.latitude, geo.coords.longitude];
        map.panTo(latlng, {zoom: 25});
      });

      toggleMenu();
    };

    document.getElementsByClassName('goToPitch')[0].onclick = function () {
      map.panTo([52.386818, 4.871052], {zoom: 30});
      toggleMenu();
    };

    var usersInterval;
    document.getElementsByClassName('toggleAllUsers')[0].onclick = function () {
      allUsers = !allUsers;
      if (allUsers) {
        Users.intervalGetMe();
      } else {
        clearInterval(usersInterval);
        var customers = _.where(actors, {type: 'customer'});
        customers.forEach(function (item) {
          map.removeLayer(item);
        });
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
