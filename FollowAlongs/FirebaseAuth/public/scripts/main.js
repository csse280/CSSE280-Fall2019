/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Dave Fisher
 */

/** namespace. */
var rh = rh || {};

rh.beginAuthListening = function() {
	// TODO: Start here on Tuesday
}

rh.enableEmailPassword = function () {
	const email = new mdc.textField.MDCTextField(document.querySelector('.email'));
	const password = new mdc.textField.MDCTextField(document.querySelector('.password'));
	new mdc.ripple.MDCRipple(document.querySelector('#createAccount'));
	new mdc.ripple.MDCRipple(document.querySelector('#login'));
};

/* Main */
$(document).ready(() => {
	console.log("Ready");
	// Kept for reference only
	// const topAppBarElement = document.querySelector('.mdc-top-app-bar');
	// const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);

	rh.enableEmailPassword();
	rh.beginAuthListening();
});