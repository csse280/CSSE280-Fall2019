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
			if (changeListener) {
				changeListener();
			}
		});
	}

	stopListening() {
		this._unsubscribe();
	}

	add(quote, movie) {
		this._ref.add({
			[rh.KEY_QUOTE]: quote,
			[rh.KEY_MOVIE]: movie,
			[rh.KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		}).then((docRef) => {
			console.log("Document has been added with id", docRef.id);
		}).catch((error) => {
			console.log("There was an error adding the document", error);
		});
	}
	update(id, quote, movie) {

	}
	delete(id) {

	}
	get length() {
		return this._documentSnapshots.length;
	}
	getIdAtIndex(index) {
		return this._documentSnapshots[index].id;
	}
	getQuoteAtIndex(index) {
		return this._documentSnapshots[index].get(rh.KEY_QUOTE);
	}
	getMovieAtIndex(index) {
		return this._documentSnapshots[index].get(rh.KEY_MOVIE);
	}
}

rh.ListPageController = class {
	constructor() {
		rh.fbMovieQuotesManager.beginListening(this.updateView.bind(this));
		// $("#addQuoteDialog").on("show.bs.modal", function (e) {
		// 	$("#inputQuote").val("");
		// 	$("#inputMovie").val("");			
		// });
		$("#addQuoteDialog").on("shown.bs.modal", function (e) {
			$("#inputQuote").trigger("focus");
		});
		$("#submitAddQuote").click((event) => {
			const quote = $("#inputQuote").val();
			const movie = $("#inputMovie").val();
			rh.fbMovieQuotesManager.add(quote, movie);
			$("#inputQuote").val("");
			$("#inputMovie").val("");
		})
	}

	updateView() {
		$("#quoteList").removeAttr("id").hide();
		let $newList = $("<ul></ul>").attr("id", "quoteList").addClass("list-group");

		for (let k = 0; k < rh.fbMovieQuotesManager.length; k++) {
			const $newCard = null; // TODO: Implement this
			$newList.append($newCard);
		}
		$("#quoteListContainer").append($newList);

		
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