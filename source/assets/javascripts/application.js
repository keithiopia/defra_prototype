

$(document).ready(function(){


  // Clicking anywhere in the table row activate the link
  $('.parcels tbody tr').click(function(){
    var ref = $(this).find('a').attr('href');
  });

  // Convert land-use list into an auto-suggest box
  $("#land-use-list").chosen();

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

});