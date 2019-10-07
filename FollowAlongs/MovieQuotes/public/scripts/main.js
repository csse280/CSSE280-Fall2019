/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  David Fisher
 */

/** namespace. */
var rh = rh || {};

/** globals */
rh.COLLECTION_MOVIEQUOTES = "MovieQuotes";
rh.KEY_QUOTE = "quote";
rh.KEY_MOVIE = "movie";
rh.KEY_LAST_TOUCHED = "lastTouched";

rh.fbMovieQuotesManager = null;

rh.FbMovieQuotesManager = class {
	constructor() {
		this._ref = firebase.firestore().collection(rh.COLLECTION_MOVIEQUOTES);
		this._documentSnapshots = [];
	}
	beginListening(changeListener) {

	}
	stopListening() {

	}
	add(quote, movie) {

	}
	update(id, quote, movie) {

	}
	delete(id) {

	}
	get length() {
		return this._documentSnapshots.length;
	}
	getIdAtIndex(index) {
		
	}
	getQuoteAtIndex(index) {
		
	}
	getMovieAtIndex(index) {
		
	}
}

rh.ListPageController = class {
	constructor() {

	}
	updateView() {

	}
}

/* Main */
$(document).ready(() => {
	console.log("Ready");

	


	rh.fbMovieQuotesManager = new rh.FbMovieQuotesManager();
});
