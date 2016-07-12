$(function() {
  var $callbackModal = $('#callback-modal');
  var $phoneInput = $('.js-phone');

  $phoneInput.mask('+0 (000) 000-00-00', {
    placeholder: '+7 (000) 000-00-00',
  });

  $callbackModal.on('shown.bs.modal', function() {
    $phoneInput.focus();
  });

  $('#approve-submit').click(checkPhoneInput);
  $callbackModal.submit(checkPhoneInput);

  function checkPhoneInput(e) {
    e.preventDefault();
    var phone = $('.js-phone').val();

    if (phone.length < 18) return false;

    $(this).attr('disabled', true);
    sendMail(phone);
  }

  function sendMail(phone) {
    $.ajax({
      url: 'https://formspree.io/ff78.spb@yandex.ru',
      method: 'POST',
      data: {
        phone: phone,
      },
      dataType: 'json',
      success: function() {
        $('#user-phone').text(phone);
        $('#callback-form').slideToggle();
        $('#callback-text').slideToggle();
      }
    });
  }
});
