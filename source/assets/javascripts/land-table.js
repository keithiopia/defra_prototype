var showInput = function($el) {
  var $row = $el.closest('tr'),
    $input = $row.find('.js-entitlements-input'),
    $display = $row.find('.js-entitlements-display');

  $display.addClass('js-hidden');
  $input.removeClass('js-hidden');

  $el.text('Save').data('toggle', 'hide');
}

var hideInput = function($el) {
  var $row = $el.closest('tr'),
    $input = $row.find('.js-entitlements-input'),
    $display = $row.find('.js-entitlements-display');

  $display.text($input.val()).removeClass('js-hidden');
  $input.addClass('js-hidden');

  $el.text('Edit').data('toggle', 'show');
  updateTotalActivatedArea();
}

var updateTotalActivatedArea = function() {
  var total = 0;
  $('.js-entitlements-display').each(function() {
    total += Number($(this).text());
  });

  console.log(total);

  $('#active-entitlements-total').text(total);
}

$(document).ready(function() {
  $('.js-toggle-entitlements').on('click', function(e) {
    e.preventDefault();
    var $el = $(this);

    if ($el.data('toggle') == 'show') {
      showInput($el);
    } else {
      hideInput($el);
    }
  });

});
