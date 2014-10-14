

$(document).ready(function(){

  // Convert land-use lists into an auto-suggest box
  $(".land-use-list").chosen();

  // Initialise toggler
  GOVUK.toggle.init();

  GOVUK.stickAtTopWhenScrolling.init();

  // Notes
  $('.notes h3').click(function(){
    $(this).toggleClass('open');
  });


  // Toggle full-screen map
  $('.full-screen .open .map-button').click(function(){
    $('.map-wrapper .map').addClass('map-full-screen');
  });
  $('.full-screen .close').click(function(){
    $('.map-wrapper .map').removeClass('map-full-screen');
  });


  // If a table row contains a link, make the whole row activate the link

  $('.js-row-link tr td:not(.parcel-select)').click(function(){
    var link = $(this).parent().find('a').attr('href');
    window.location = link;
  });

    // If a table row contains a link, make the whole row activate the link

  $('.js-row-select tr td:not(.parcel-select)').click(function(){
    $(this).parent().find('js-select-row').click();
  });


  // Highlight a selected row

  $('.js-select-row').change(function(e) {
    $(this).closest("tr").toggleClass("highlight", this.checked);
  });


  // Filter table

  $(".table-filter input").on("input",function(e){

    if($(this).val()=="") {

      $('.parcels tr').show();

    } else {

      $('.parcels tr:not(:contains("'+$(this).val()+'"))').hide();
      $('.parcels tr a:not(:contains("'+$(this).val()+'"))').closest('tr').hide();

    }

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
        $sumDisplay.text("Total: "+sum.toFixed(2)+" ha");
  });



});