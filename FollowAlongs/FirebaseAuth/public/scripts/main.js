/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author 
 */

/** namespace. */
var rh = rh || {};

rh.enableEmailPassword = function () {
	const username = new mdc.textField.MDCTextField(document.querySelector('.username'));
	const password = new mdc.textField.MDCTextField(document.querySelector('.password'));

	new mdc.ripple.MDCRipple(document.querySelector('.cancel'));
	new mdc.ripple.MDCRipple(document.querySelector('.next'));
};

/* Main */
$(document).ready(() => {
	console.log("Ready");
	// Kept for reference only
	// const topAppBarElement = document.querySelector('.mdc-top-app-bar');
	// const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);

	rh.enableEmailPassword();

});