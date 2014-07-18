

$(document).ready(function(){


  // Clicking anywhere in the table row activate the link
  $('.parcels tbody tr').click(function(){
    var ref = $(this).find('a').attr('href');
  });

  // Convert land-use lists into an auto-suggest box
  $(".land-use-list").chosen();

  // Initialise toggler
  GOVUK.toggle.init();

  GOVUK.stickAtTopWhenScrolling.init();

  // Notes
  $('.notes h3').click(function(){
    $(this).toggleClass('open');
  });

  // Rowclick - if a table row contains a link, make the whole row activate the link
  $('.js-row-link tr').click(function(){
    var link = $(this).find('a').attr('href');
    window.location = link;
  });

  // Running total of areas in a land use table
  var $table = $('.land-use-table'),
  $summands = $table.find('.area-field'),
  $sumDisplay = $('.running-total');
  $table.delegate('.area-field', 'change', function (){
        var sum = 0;
        $summands.each(function (){
            var value = Number($(this).val());
            if (!isNaN(value)) sum += value;
        });
        $sumDisplay.text(sum.toFixed(2)+" ha");
  });

});