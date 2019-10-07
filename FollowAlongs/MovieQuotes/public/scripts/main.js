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
		this._unsubscribe = null;
	}

	beginListening(changeListener) {
		console.log("Listening for movie quotes");
		this._unsubscribe = this._ref.onSnapshot((querySnapshot) => {
			this._documentSnapshots = querySnapshot.docs;
			console.log("Update " + this._documentSnapshots.length + " movie quotes");
			// querySnapshot.forEach( (doc) => {
			// 	console.log(doc.data());
			// });
			if(changeListener) {
				changeListener();
			}
		});
	}

	stopListening() {
		this._unsubscribe();
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
		rh.fbMovieQuotesManager.beginListening(this.updateView.bind(this));
	}
	updateView() {
		console.log("The model object has changed.  I need to use it!", this);
	}
}

/* Main */
$(document).ready(() => {
	console.log("Ready");
	if ($("#list-page").length) {
		console.log("On the list page");
		rh.fbMovieQuotesManager = new rh.FbMovieQuotesManager();
		new rh.ListPageController();
	}
});