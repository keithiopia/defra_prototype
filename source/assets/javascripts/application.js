

$(document).ready(function(){


  // Clicking anywhere in the table row activate the link
  $('.parcels tbody tr').click(function(){
    var ref = $(this).find('a').attr('href');
  });

  // Convert land-use list into an auto-suggest box
  $("#land-use-list").chosen();

  // Initialise toggler
  GOVUK.toggle.init();

  $('.map-wrapper').fixer({ gap: 10 });


});