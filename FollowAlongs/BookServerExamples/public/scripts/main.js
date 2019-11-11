/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author David Fisher
 */

/** namespace. */
var rh = rh || {};

/** globals */
rh.counter = 0;

rh.updateView = function () {
	$("#counter-text").html("Count = " + rh.counter);
};

/* Main */
$(document).ready(() => {
	console.log("Ready");
	$("#dec-button").click(function() {
		rh.counter -= 1;
		rh.updateView();
	});
	$("#reset-button").click(function() {
		rh.counter = 0;
		rh.updateView();
	});
	$("#inc-button").click(function() {
		rh.counter += 1;
		rh.updateView();
	});
});
