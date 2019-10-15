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

rh.MovieQuote = class {
	constructor(id, quote, movie) {
		this.id = id;
		this.quote = quote;
		this.movie = movie;
	}
}

rh.FbMovieQuotesManager = class {
	constructor() {
		this._ref = firebase.firestore().collection(rh.COLLECTION_MOVIEQUOTES);
		this._documentSnapshots = [];
		this._unsubscribe = null;
	}

	beginListening(changeListener) {
		console.log("Listening for movie quotes");
		this._unsubscribe = this._ref.orderBy(rh.KEY_LAST_TOUCHED, "desc").limit(30).onSnapshot((querySnapshot) => {
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
	get length() {
		return this._documentSnapshots.length;
	}
	// getIdAtIndex(index) {
	// 	return this._documentSnapshots[index].id;
	// }
	// getQuoteAtIndex(index) {
	// 	return this._documentSnapshots[index].get(rh.KEY_QUOTE);
	// }
	// getMovieAtIndex(index) {
	// 	return this._documentSnapshots[index].get(rh.KEY_MOVIE);
	// }
	getMovieQuoteAtIndex(index) {
		return new rh.MovieQuote(
			this._documentSnapshots[index].id,
			this._documentSnapshots[index].get(rh.KEY_QUOTE),
			this._documentSnapshots[index].get(rh.KEY_MOVIE)
		);
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
			const $newCard = this.createQuoteCard(
				// rh.fbMovieQuotesManager.getIdAtIndex(k),
				// rh.fbMovieQuotesManager.getQuoteAtIndex(k),
				// rh.fbMovieQuotesManager.getMovieAtIndex(k)

				rh.fbMovieQuotesManager.getMovieQuoteAtIndex(k)
			);
			$newList.append($newCard);
		}
		$("#quoteListContainer").append($newList);
	}

	// createQuoteCard(id, quote, movie) {}
	createQuoteCard(movieQuote) {
		// const $newCard = $("#quoteCardTemplate").clone()
		// 					.attr("id", movieQuote.id).removeClass("invisible");
		// $newCard.find(".quote-card-quote").text(movieQuote.quote);
		// $newCard.find(".quote-card-movie").text(movieQuote.movie);

		const $newCard = $(`
		  <li id="${movieQuote.id}" class="quote-card list-group-item">
		     <div class="quote-card-quote">${movieQuote.quote}</div>
		     <div class="quote-card-movie text-right blockquote-footer">${movieQuote.movie}</div>
	      </li>`);
		$newCard.click((event) => {
			console.log("You have clicked", movieQuote);
			rh.storage.setMovieQuoteId(movieQuote.id);
			window.location.href = "/moviequote.html";
		});
		return $newCard;
	}
}


rh.storage = rh.storage || {};
rh.storage.KEY_MOVIE_QUOTE_ID = "movieQuoteId";
rh.storage.setMovieQuoteId = function(movieQuoteId) {
	sessionStorage.setItem(rh.storage.KEY_MOVIE_QUOTE_ID, movieQuoteId);
}

rh.storage.getMovieQuoteId = function() {
	const movieQuoteId = sessionStorage.getItem(rh.storage.KEY_MOVIE_QUOTE_ID);
	if (!movieQuoteId) {
		console.log("Missing the Movie Quote ID!!!!!");
	}
	return movieQuoteId;
}

rh.FbSingleMovieQuoteManager = class {
	constructor(movieQuoteId) {
		this._ref = firebase.firestore().collection(rh.COLLECTION_MOVIEQUOTES).doc(movieQuoteId);
		this._document = {};
		this._unsubscribe = null;
	}

	beginListening(changeListener) {
		// console.log("Listening for movie quotes");
		// this._unsubscribe = this._ref.orderBy(rh.KEY_LAST_TOUCHED, "desc").limit(30).onSnapshot((querySnapshot) => {
		// 	this._documentSnapshots = querySnapshot.docs;
		// 	console.log("Update " + this._documentSnapshots.length + " movie quotes");
		// 	// querySnapshot.forEach( (doc) => {
		// 	// 	console.log(doc.data());
		// 	// });
		// 	if (changeListener) {
		// 		changeListener();
		// 	}
		// });
	}

	stopListening() {
		this._unsubscribe();
	}

	update(quote, movie) {

	}
	delete() {

	}

	get quote() {

	}
	get movie() {

	}
}

rh.DetailPageController = class {
	constructor() {
		// rh.fbMovieQuotesManager.beginListening(this.updateView.bind(this));
		// // $("#addQuoteDialog").on("show.bs.modal", function (e) {
		// // 	$("#inputQuote").val("");
		// // 	$("#inputMovie").val("");			
		// // });
		// $("#addQuoteDialog").on("shown.bs.modal", function (e) {
		// 	$("#inputQuote").trigger("focus");
		// });
		// $("#submitAddQuote").click((event) => {
		// 	const quote = $("#inputQuote").val();
		// 	const movie = $("#inputMovie").val();
		// 	rh.fbMovieQuotesManager.add(quote, movie);
		// 	$("#inputQuote").val("");
		// 	$("#inputMovie").val("");
		// })
	}

	updateView() {

	}
}

/* Main */
$(document).ready(() => {
	console.log("Ready");
	if ($("#list-page").length) {
		console.log("On the list page");
		rh.fbMovieQuotesManager = new rh.FbMovieQuotesManager();
		new rh.ListPageController();
	} else if ($("#detail-page").length) {
		console.log("On the detail page");
		
	}
	

});