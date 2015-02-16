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
