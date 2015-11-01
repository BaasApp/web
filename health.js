$(function() {
  var $healthLoginForm = $('#health-login form');
  var $loader = $('#health-login .loader');

  $('.healthLogin').on('click', function() {
    $('#health-login').addClass('show');
  });

  $healthLoginForm.on('submit', function(e) {
    e.preventDefault();

    $(e.currentTarget).attr('disable', 'disable');

    $healthLoginForm.addClass('hide');
    $loader.removeClass('hide').addClass('show');

    Users.postHealth($('#health-email').val(), $('#health-password').val(), function() {
      $('#health-login').removeClass('show');
    });
  });
});
