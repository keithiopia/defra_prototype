

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

  // business eligibility

  var $eligibility = $('#eligibility');

  if ($eligibility.length > 0) {
    var landCookie = GOVUK.getCookie('landCookie'),
        entitlementsCookie = GOVUK.getCookie('entitlementsCookie'),
        activitiesCookie = GOVUK.getCookie('activitiesCookie');

    if (landCookie == null) {
      GOVUK.setCookie('landCookie', 'yes');
    }

    if (entitlementsCookie == null) {
      GOVUK.setCookie('entitlementsCookie', 'yes');
    }

    checkLand();
    checkEntitlements();
    checkActivities();
  }

  function checkLand() {
    var landCookie = GOVUK.getCookie('landCookie');

    if (landCookie == 'yes') {
      $('#land-no').addClass('js-hidden');
    } else if (landCookie == 'no') {
      $('#land-yes').addClass('js-hidden');
    }
  }

  function checkEntitlements() {
    var entitlementsCookie = GOVUK.getCookie('entitlementsCookie');

    if (entitlementsCookie == 'yes') {
      $('#entitlements-no').addClass('js-hidden');
    } else if (entitlementsCookie == 'no') {
      $('#entitlements-yes').addClass('js-hidden');
    }
  }

  function checkActivities() {
    var activitiesCookie = GOVUK.getCookie('activitiesCookie');

    if (activitiesCookie == null) {
      $('#activities-yes, #activities-no').addClass('js-hidden');
    } else if (activitiesCookie == 'yes') {
      $('#activities-undefined, #activities-no').addClass('js-hidden');
    } else if (activitiesCookie == 'no') {
      $('#activities-undefined, #activities-yes').addClass('js-hidden');
    }
  }

  $('#set-activities').on('click', function(e) {
    e.preventDefault();
    if ($('input[name=activities]:checked', '#activities-form').val() == 'yes') {
      GOVUK.setCookie('activitiesCookie', 'no');
    } else {
      GOVUK.setCookie('activitiesCookie', 'yes');
    }
    window.location = this.href;
  });

  $('#js-set-land-yes').on('click', function(e) {
    e.preventDefault;
    GOVUK.setCookie('landCookie', 'yes');
  });

  $('#js-set-land-no').on('click', function(e) {
    e.preventDefault;
    GOVUK.setCookie('landCookie', 'no');
  });

  $('#js-set-entitlements-yes').on('click', function(e) {
    e.preventDefault;
    GOVUK.setCookie('entitlementsCookie', 'yes');
  });

  $('#js-set-entitlements-no').on('click', function(e) {
    e.preventDefault;
    GOVUK.setCookie('entitlementsCookie', 'no');
  });

  $('#js-clear-cookies').on('click', function(e) {
    e.preventDefault();
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
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