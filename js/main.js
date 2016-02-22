$(document).ready(function () {
	
	
	$(function () { // activates bootstrap tooltip feature
  		$('[data-toggle="tooltip"]').tooltip();
	});
	
	$.validator.setDefaults({ 
		errorClass: 'help-block', // sets error message to red text
		highlight: function(element) { // element field in questions highlights red
			$(element)
				.closest('.form-group')
				.addClass('has-error');
		},
		unhighlight: function(element) { // red highlight is removed once a valid input is inputed in the field
			$(element)
				.closest('.form-group')
				.removeClass('has-error');
		}
	});
	
	
	$.validator.addMethod( "lettersonly", function( value, element ) { // makes a field accept only letters
	return this.optional( element ) || /^[a-z]+$/i.test( value );
	}, "Letters only please" );
	
	
	
	$.validator.addMethod( "integer", function( value, element ) { // makes a field accept only integers, no decimal values
	return this.optional( element ) || /^-?\d+$/.test( value );
	}, "A positive non-decimal number please" );
	
	
	
	$.validator.addMethod( "stateUS", function( value, element, options ) { // makes a field accept only valid states or territories
	var isDefault = typeof options === "undefined",
		caseSensitive = ( isDefault || typeof options.caseSensitive === "undefined" ) ? false : options.caseSensitive,
		includeTerritories = ( isDefault || typeof options.includeTerritories === "undefined" ) ? false : options.includeTerritories,
		includeMilitary = ( isDefault || typeof options.includeMilitary === "undefined" ) ? false : options.includeMilitary,
		regex;

	if ( !includeTerritories && !includeMilitary ) {
		regex = "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	} else if ( includeTerritories && includeMilitary ) {
		regex = "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	} else if ( includeTerritories ) {
		regex = "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	} else {
		regex = "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	}

	regex = caseSensitive ? new RegExp( regex ) : new RegExp( regex, "i" );
	return this.optional( element ) || regex.test( value );
}, "Please specify a valid state" );
	
	$.validator.addMethod( "creditcard", function( value, element ) { // makes field accept only 16-19 characters, spaces and digits only allowed
	if ( this.optional( element ) ) {
		return "dependency-mismatch";
	}

	// Accept only spaces and digits
	if ( /[^0-9 ]+/.test( value ) ) {
		return false;
	}

	var nCheck = 0,
		nDigit = 0,
		bEven = false,
		n, cDigit;

	value = value.replace( /\D/g, "" );

	// Basing min and max length on
	// http://developer.ean.com/general_info/Valid_Credit_Card_Types
	if ( value.length < 16 || value.length > 19 ) {
		return false;
	}

	for ( n = value.length - 1; n >= 0; n-- ) {
		cDigit = value.charAt( n );
		nDigit = parseInt( cDigit, 10 );
		if ( bEven ) {
			if ( ( nDigit *= 2 ) > 9 ) {
				nDigit -= 9;
			}
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return ( nCheck % 10 ) === 0;
}, "Please enter a valid credit card number." );
	
	
	$(".form-horizontal").validate({ // validation object
		submitHandler: function(form) { 
    	form.submit();
  },
		rules: {
			personName: {
				required: true,
				lettersonly: true,
				maxlength: 128
			},
			address: "required",
			city: "required",
			state: {
				required: true,
				lettersonly: true,
				rangelength: [2, 2],
				stateUS: {
					caseSensative: false,
					includeTerritories: false,
					includeMilitary: false
					
				}
			},
			zip: {
				required: true,
				digits: true,
				integer: true,
				rangelength: [5, 5]
			},
			cardHolder: {
				required: true,
				lettersonly: true,
				maxlength: 128
			},
			cardNumber: {
				required: true,
				creditcard: true,
				rangelength: [16, 19]
			},
			expiryMonth: {
				required: true
			},
			expiryYear: "required",
			cvv: {
				required: true,
				digits: true,
				rangelength: [3, 3]
			},
			shippingMethod: "required",
			comments: {
				required: false,
				maxlength: 500
			}
		}
	});
	
	
	
});




/* Custom JS goes here. */

// For this assignment you'll need to do a few things:
// 1. Create a document ready handler.
// 2. Define a validation object for use on your page.
// 3. Connect th;e validation object to an event handler tied to the submit button.

// Refer to the `index.html` file for the validation rules that must be enforced.
