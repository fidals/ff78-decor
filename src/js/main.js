$(function() {
  var $callbackModal = $('#callback-modal');
  var $phoneInput = $('.js-phone');
  var $phoneForConsult = $('.js-consult-phone');
  var $consultForm = $('#consult-form');

  $phoneInput.mask('+0 (000) 000-00-00', {
    placeholder: '+7 (000) 000-00-00',
  });

  $phoneForConsult.mask('+0 (000) 000-00-00');

  $callbackModal.on('shown.bs.modal', function() {
    $phoneInput.focus();
  });

  $('#approve-submit').click(checkModalForm);
  $consultForm.submit(checkFullForm);
  $callbackModal.submit(checkModalForm);

  function checkModalForm(e) {
    e.preventDefault();
    var phone = $('.js-phone').val();

    if (phone.length < 18) return false;

    $(this).attr('disabled', true);

    var formData = {
      phone: phone,
      _subject: 'Заказ звонка',
      _format: 'plain',
    };

    var afterSuccess = function() {
      $('#user-phone').text(phone);
      $('#callback-form').slideToggle();
      $('#callback-text').slideToggle();
    };

    sendMail(formData, afterSuccess);
  }

  function checkFullForm(e) {
    e.preventDefault();
    var phone = $phoneForConsult.val();
    var email = $('.js-consult-email').val()

    if (phone.length < 18) {
      return false;
    }

    $('#submit-consult-form').attr('disabled', true);

    var formData = {
      name: $('.js-consult-name').val(),
      phone: phone,
      email: email,
      _subject: 'Заявка на консультацию флориста',
      _cc: email,
    };

    var afterSuccess = function() {
      $('.js-consult-start-text, .js-consult-success-text, #consult-form').slideToggle();
    };

    sendMail(formData, afterSuccess);
  }

  function sendMail(data, callback) {
    $.ajax({
      url: 'https://formspree.io/ff78.spb@yandex.ru',
      data: data,
      dataType: 'json',
      method: 'POST',
      success: callback
    });
  }
});
