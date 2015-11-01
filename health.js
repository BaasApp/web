$(function() {
  var $healthLoginForm = $('#health-login form');
  var $loader = $('#health-login .loader');

  $('#health-login .close').on('click', function(e) {
    e.preventDefault();

    $('#health-login').removeClass('show');
  });

  $('.healthLogin, .gauge-placeholder').on('click', function() {
    $('#health-login').addClass('show');
  });

  $healthLoginForm.on('submit', function(e) {
    e.preventDefault();

    $(e.currentTarget).attr('disable', 'disable');

    $healthLoginForm.addClass('hide');
    $loader.removeClass('hide').addClass('show');

    $('.gauge').css('visibility', 'visible');
    $('.gauge-placeholder').toggle();

    Users.postHealth($('#health-email').val(), $('#health-password').val(), function() {
      $('#health-login').removeClass('show');
    });
  });
});
