// business eligibility

var $eligibility = $('#eligibility');

if ($eligibility.length > 0) {
  var landCookie = GOVUK.getCookie('landCookie'),
      entitlementsCookie = GOVUK.getCookie('entitlementsCookie'),
      activitiesCookie = GOVUK.getCookie('activitiesCookie');

  if (landCookie == null) {
    GOVUK.setCookie('landCookie', 30);
  }

  if (entitlementsCookie == null) {
    GOVUK.setCookie('entitlementsCookie', 30);
  }

  checkLand();
  checkEntitlements();
  checkActivities();
}

function checkLand() {
  var landCookie = GOVUK.getCookie('landCookie');

  if (landCookie >= 5) {
    $('#land-no').addClass('js-hidden');
  } else if (landCookie < 5) {
    $('#land-yes').addClass('js-hidden');
  }
}

function checkEntitlements() {
  var entitlementsCookie = GOVUK.getCookie('entitlementsCookie');

  if (entitlementsCookie >= 5) {
    $('#entitlements-no').addClass('js-hidden');
  } else if (entitlementsCookie < 5) {
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

if (($('#scheme-eligibility').length > 0)) {
  checkEligibility();
}

function checkEligibility() {
  // set by user / cookie
  var totalLand    = GOVUK.getCookie('landCookie'),
      entitlements = GOVUK.getCookie('entitlementsCookie'),
      activeFarmer = GOVUK.getCookie('activitiesCookie'),
      declaredLand = GOVUK.getCookie('declaredLandCookie'),
      numberCrops  = GOVUK.getCookie('numberCropsCookie'),
      declaredEFAs = GOVUK.getCookie('declaredEFAsCookie')
      showAll      = GOVUK.getCookie('showAllCookie');

  // override
  if (showAll == "true") {
    console.log('showAll');
    $('.js-hidden').removeClass('js-hidden');
    return true;
  }


  // set defaults
  if (totalLand == null) totalLand = 0;
  if (entitlements == null) entitlements = 0;
  if (declaredLand == null) declaredLand = 0;
  if (numberCrops == null) numberCrops = 0;
  if (declaredEFAs == null) declaredEFAs = 0;

  // flags
  var cropDiversification = false,
      requiredEFAs = false;

  // basic eligibility
  if (totalLand > 5 && entitlements > 5) {
    // show land & entitlements good
    $('#land-entitlements-pass').removeClass('js-hidden');
  } else {
    // show land & entitlements bad
    if (totalLand < 5) {
      // show land error
      // TODO
    }

    if (entitlements < 5) {
      // show entitlements error
      $('#land-entitlements-fail').removeClass('js-hidden');
    }
  }

  if (activeFarmer == "null") {
    $('#active-farmer-undefined').removeClass('js-hidden');
  } else if (activeFarmer == "yes") {
    // show active farmer good
    $('#active-farmer-pass').removeClass('js-hidden');
  } else if (activeFarmer == "no") {
    // show active farmer bad
    $('#active-farmer-fail').removeClass('js-hidden');
  }

  if (declaredLand < 80) {
    // show land use bad
    $('#land-use-fail').removeClass('js-hidden');
  } else {
    // show land use good
    $('#land-use-pass').removeClass('js-hidden');
  }

  // greening
  if (totalLand < 5) {
    // don't show greening if not enough land
    $('#greening-land-use-fail').removeClass('js-hidden');
  } else {
    if (declaredLand < 80) {
      // show not enough land
      $('#greening-land-use-fail').removeClass('js-hidden');
    } else {
      // set crop diversification to false
      cropDiversification = false;
      // set efas to false
      requiredEFAs = false;

      if (totalLand >= 10 && totalLand < 30) {
        // set crop diversification to 2
        cropDiversification = 2;
      } else if (totalLand >= 30) {
        // set crop diversification to 3
        cropDiversification = 3;
      }

      if (totalLand >= 15) {
        // set EFAs to 5
        requiredEFAs = 5;
      }

      console.log(totalLand, requiredEFAs, declaredEFAs);

      if (cropDiversification == false) {
        // show ineligible for crop diversification
      } else {
        if (numberCrops < cropDiversification) {
          // crop diversification bad
          $('#crop-diversification-fail').removeClass('js-hidden');
        } else {
          // crop diversification good
          $('#crop-diversification-pass').removeClass('js-hidden');
        }
      }

      if (requiredEFAs == false) {
        // show ineligible for efas
        // TODO
      } else {
        if (declaredEFAs < requiredEFAs) {
          // efas bad
          $('#efa-fail').removeClass('js-hidden');
        } else {
          // efas good
          $('#efa-pass').removeClass('js-hidden');
        }
      }

    }
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

$('.js-set-land').on('click', function(e) {
  e.preventDefault();
  var $el = $(this);
  GOVUK.setCookie('landCookie', $el.data('value'));

  alert('Land set to ' + $el.data('value') + 'ha');
});

$('.js-set-entitlements').on('click', function(e) {
  e.preventDefault();
  var $el = $(this);
  GOVUK.setCookie('entitlementsCookie', $el.data('value'));

  alert('Entitlements set to ' + $el.data('value'));
});

$('.js-set-activities').on('click', function(e) {
  e.preventDefault();
  var $el = $(this);

  GOVUK.setCookie('activitiesCookie', $el.data('value'));

  alert('Active Farmer set to ' + $el.data('value'));
});

$('.js-set-land-use').on('click', function(e) {
  e.preventDefault();
  var $el = $(this);
  GOVUK.setCookie('declaredLandCookie', $el.data('value'));

  alert('Declared land use set to ' + $el.data('value')+'%');
});

$('.js-set-number-crops').on('click', function(e) {
  e.preventDefault();
  var $el = $(this);
  GOVUK.setCookie('numberCropsCookie', $el.data('value'));

  alert('Number of crops set to ' + $el.data('value'));
});

$('.js-set-efas').on('click', function(e) {
  e.preventDefault();
  var $el = $(this);
  GOVUK.setCookie('declaredEFAsCookie', $el.data('value'));

  alert('Declared EFAs set to ' + $el.data('value')+'%');
});

$('.js-show-all-options').on('click', function(e) {
  e.preventDefault();
  GOVUK.setCookie('showAllCookie', true);

  alert('Show all options set');
})


$('.js-clear-cookies').on('click', function(e) {
  e.preventDefault();
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  alert('Cookies cleared');
});
