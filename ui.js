var trackMovement = false;

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

  document.getElementsByClassName('wipeHeat')[0].onclick = function () {
    trackMovement = false;
    customerHeat.setLatLngs([]);
    beerHeat.setLatLngs([]);
    toggleMenu();
  };
});
