$(document).ready(function() {

  // Get parameter value from querystring

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // Example - Highlight grid

  if ($('.js-highlight-grid').length>0) {

    $('.js-highlight-grid').click(function(e) {

      e.preventDefault();
      var html = $('html');

      if ($('.is-inner-block-highlight').length>0) {
        // Don't add more than once
      } else {
        $('.grid .inner-block').wrapInner('<div class="is-inner-block-highlight"></div>');
      }

      if (html.hasClass('example-highlight-grid')) {
          html.removeClass('example-highlight-grid');
      } else {
          html.addClass('example-highlight-grid');
      }

    });

  }

  // Example - Form focus styles

  if ($('.form').length>0) {

    $(".block-label").each(function() {

      // Add focus
      $(".block-label input").focus(function() {
        $("label[for='" + this.id + "']").addClass("add-focus");
        }).blur(function() {
        $("label").removeClass("add-focus");
      });

      // Add selected class
      $('input:checked').closest('.block-label').addClass('selected');

    });

    // Add/remove selected class
    $('.block-label').find('input[type=radio], input[type=checkbox]').click(function() {

      $('input:not(:checked)').closest('.block-label').removeClass('selected');
      $('input:checked').closest('.block-label').addClass('selected');

      $('.toggle-content').hide();

      var target = $('input:checked').parent().attr('data-target');
      $('#'+target).show();

    });

    // For pre-checked inputs, show toggled content
    var target = $('input:checked').parent().attr('data-target');
    $('#'+target).show();

  }

  // Example - Add aria support to details
  // See /javascripts/vendor/details.polyfill.js


  // Set land-use type when the land use is chosen
  $('.land-use-list').on('change',function(){
    $('#land-use-type').val($(this).find(':selected').data('type'))
  });

  // Set land-use type when the land use is chosen
  $('#year-added').on('change',function(){
    if($(this).find(':selected').val() == 'Before 2011'){
      $('#month-added').addClass('js-hidden')
    } else {
      $('#month-added').removeClass('js-hidden')
    }
  });


  // Show chosen land use on screen
  var landUse = getParameterByName('land-use');
  if(landUse != ""){

    $(".js-land-use").text(landUse);

  }




  // Hide 'content'
  $("[class^='content-']").hide();

  // Show content relating to land-use type
  var landUseType = getParameterByName('land-use-type');
  if(landUseType){
    $(".content-" + landUseType).show()
  }


  // Hide errors
  $("[class^='error-']").hide();

  // Show errors
  var error = getParameterByName('error');
  if(error){
    $(".error-" + error).show()
  }


  // Show 'Unverified changes' panel
  if (getParameterByName('changed') != 'true'){
    $("#submit-changes").hide();
  }

  // Append current querystring to link
  var q = document.URL.split('?')[1];
  if(q != ""){
    $('a.js-pass-querystring').each(function(){
         this.href += '?' + q;
    })
  }

  // If someone adds multiple crops route them via the multi-use screens
  $('#add-another-use-link').click(function(){
    $('#single-use').hide();
    $('#multi-use').show();
  });


});
