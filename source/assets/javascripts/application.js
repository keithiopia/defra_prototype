

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

  $('body').on('change', 'input,select,textarea', function(){

    var $this = $(this);
    // toggle optional sections
    if ($this.is(':checkbox')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '""]');
      if ($toggleTarget.length){
        $toggleTarget.toggle($this.is(':checked') && $this.val() == $toggleTarget.attr('data-toggle-value'));
      }

    } else if ($this.is(':radio')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name'));

      $toggleTarget.each(function(){
        var $thisTarget = $(this);
        var toggleValue = $thisTarget.data('toggle-value').toString().split(',');
        var toggleFlag = false;
        for (var i = toggleValue.length - 1; i >= 0; i--) {
          if ($this.val() == toggleValue[i]) toggleFlag = true;
        };
        $thisTarget.toggle(toggleFlag);
      });
    }

  });

  $('#permissions-type').find('input[name=person-type]').on('change', function(e) {
    console.log($(this).val());
    $('#permissions-type-next').attr('href', '/permissions-february/find-'+$(this).val());
  });

  $('#permissions-find-person').find('button').on('click', function(e) {
    e.preventDefault();
    $('#person-details').removeClass('hidden');
  });

  $('#permissions-find-agent').find('button').on('click', function(e) {
    e.preventDefault();
    $('#agent-details').removeClass('hidden');
  });
});