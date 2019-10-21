/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author 
 */

/** namespace. */
var rh = rh || {};

/** globals */
rh.variableName = "";

/** function and class syntax examples */
rh.functionName = function () {
	/** function body */
};

rh.ClassName = class {
	/** constructor */
	constructor() {

	}
	methodName() {

	}
}

/* Main */
$(document).ready(() => {
	console.log("Ready");

	mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));
	// mdc.ripple.MDCRipple.attachTo($('.foo-button').get(0));

	// const topAppBarElement = document.querySelector('.mdc-top-app-bar');
	// const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);


});