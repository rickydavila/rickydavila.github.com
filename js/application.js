function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
  return pattern.test(emailAddress);
};

(function($) {

    // Switches
	$("[data-toggle='switch']").bootstrapSwitch({
		baseClass: 'switch'
	});

	$("[data-toggle='switch'][class='switch-large']").bootstrapSwitch({
		baseClass: 'switch',
		wrapperClass: 'switch-large'
	});

	// Toolbar
	$('#top-toolbar').toolbar({
		content: '#user-toolbar-options',
		position: 'top'
	});

	$('#bottom-toolbar').toolbar({
		content: '#user-toolbar-options',
		position: 'bottom'
	});

	$('#vertical-top-toolbar').toolbar({
		content: '#user-toolbar-options',
		position: 'vertical-top'
	});

	$('#vertical-bottom-toolbar').toolbar({
		content: '#user-toolbar-options',
		position: 'vertical-bottom'
	});

/*	// Button Animations
	var animateButtons = Array.prototype.slice.call( document.querySelectorAll( '.btn-animate' ) ),
		totalButtons = animateButtons.length;
		animateButtons.forEach( function( el, i ) {
			el.addEventListener( 'click', activate, false );
		});

	function activate() {
		var self = this, activatedClass = 'btn-activated';

		if( classie.has( this, 'btn-animate-result' ) ) {

			if( classie.has( this, 'btn-result-success' ) ) {
				activatedClass = 'btn-animate-success';
			}

			if( classie.has( this, 'btn-result-error' ) ) {
				activatedClass = 'btn-animate-error';
			}
		}

		if( !classie.has( this, activatedClass ) ) {
			classie.add( this, activatedClass );
			setTimeout( function() { classie.remove( self, activatedClass ) }, 1500 );
		}
	}*/

  // Send message
/*  var contactFrom = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');
  var contactError = document.getElementById('contact-error');
  var sendBtn = document.getElementById('send-button');*/
  var onMessageComplete = function(error) {
    //sendBtn.disabled = false;
    if (error) {
      //sendBtn.disabled = false;
      //contactError.innerHTML = 'Sorry. Could not send message.';
      $('#warning-row').show();
      $('#send-button').removeClass('btn-animate-error btn-animate-success').addClass('btn-animate-error');
    } else {
      //contactSuccess.innerHTML = "Message has been sent.";
      // hide the form
      $('#send-button').removeClass('btn-animate-error').addClass('btn-animate-success');
      $('#warning-row').hide();
      $('#email-form-group').hide();
      $('#company-form-group').hide();
      $('#thankyou-form-group').show().addClass('bounceInLeft');
      //console.log('All good');
    }
  };

  $('#send-button').click(function(event) {
    event.preventDefault();
    var email = $('#form-email').val();
    var company = $('#form-company').val();
    if(isValidEmailAddress(email) && company != '') {
      var myFirebaseRef = new Firebase("https://boiling-fire-7840.firebaseio.com/");
      myFirebaseRef.push({
        company: company,
        email: email
      }, onMessageComplete);
    } else {
      $('#send-button').addClass('btn-result-error').addClass('btn-animate-error');
      $('#warning-row').show();
    }
  });
})(jQuery);