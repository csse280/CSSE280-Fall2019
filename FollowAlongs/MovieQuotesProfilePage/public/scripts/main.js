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
rh.KEY_UID = "uid";

rh.COLLECTION_USERS = "Users";
rh.KEY_NAME = "name";
rh.KEY_PHOTO_URL = "photoUrl";

rh.ROSEFIRE_REGISTRY_TOKEN = "9d14d1f4-c5c0-42ef-bba1-584e75dc20e5";

rh.fbMovieQuotesManager = null;
rh.fbSingleMovieQuoteManager = null;
rh.fbAuthManager = null;
rh.fbUserManager = null;

rh.MovieQuote = class {
	constructor(id, quote, movie) {
		this.id = id;
		this.quote = quote;
		this.movie = movie;
	}
}

rh.FbMovieQuotesManager = class {
	constructor(uid) {
		this._ref = firebase.firestore().collection(rh.COLLECTION_MOVIEQUOTES);
		this._documentSnapshots = [];
		this._unsubscribe = null;
		this._uid = uid;
	}

	beginListening(changeListener) {
		console.log("Listening for movie quotes");
		let query = this._ref.orderBy(rh.KEY_LAST_TOUCHED, "desc").limit(30);
		if (this._uid) {
			query = query.where(rh.KEY_UID, "==", this._uid);
		}
		this._unsubscribe = query.onSnapshot((querySnapshot) => {
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
			[rh.KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now(),
			[rh.KEY_UID]: rh.fbAuthManager.uid,
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

		$("#menuShowMyQuotes").click((event) => {
			console.log("Show only my Movie Quotes.");
			window.location.href = `/list.html?uid=${rh.fbAuthManager.uid}`;
		});
		$("#menuShowAllQuotes").click((event) => {
			console.log("Show all Movie Quotes.");
			window.location.href = "/list.html";
		});
		$("#menuSignOut").click((event) => {
			console.log("Sign out.");
			rh.fbAuthManager.signOut();
		});

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
		});
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
			// rh.storage.setMovieQuoteId(movieQuote.id);
			window.location.href = `/moviequote.html?id=${movieQuote.id}`;
		});
		return $newCard;
	}
}


// rh.storage = rh.storage || {};
// rh.storage.KEY_MOVIE_QUOTE_ID = "movieQuoteId";
// rh.storage.setMovieQuoteId = function(movieQuoteId) {
// 	sessionStorage.setItem(rh.storage.KEY_MOVIE_QUOTE_ID, movieQuoteId);
// }

// rh.storage.getMovieQuoteId = function() {
// 	const movieQuoteId = sessionStorage.getItem(rh.storage.KEY_MOVIE_QUOTE_ID);
// 	if (!movieQuoteId) {
// 		console.log("Missing the Movie Quote ID!!!!!");
// 	}
// 	return movieQuoteId;
// }

rh.FbSingleMovieQuoteManager = class {
	constructor(movieQuoteId) {
		this._ref = firebase.firestore().collection(rh.COLLECTION_MOVIEQUOTES).doc(movieQuoteId);
		this._document = {};
		this._unsubscribe = null;
	}

	beginListening(changeListener) {
		console.log("Listening for this movie quote");
		this._unsubscribe = this._ref.onSnapshot((doc) => {
			if (doc.exists) {
				this._document = doc;
				console.log('doc.data() :', doc.data());
				if (changeListener) {
					changeListener();
				}
			} else {
				// This document does not exist (or has been deleted)
				//window.location.href = "/";

			}
		});
	}

	stopListening() {
		this._unsubscribe();
	}

	update(quote, movie) {
		this._ref.update({
			[rh.KEY_QUOTE]: quote,
			[rh.KEY_MOVIE]: movie,
			[rh.KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		}).then((docRef) => {
			console.log("The update is complete");
		});
	}
	delete() {
		return this._ref.delete();
	}

	get quote() {
		return this._document.get(rh.KEY_QUOTE);
	}

	get movie() {
		return this._document.get(rh.KEY_MOVIE);
	}

	get uid() {
		return this._document.get(rh.KEY_UID);
	}
}

rh.DetailPageController = class {
	constructor() {
		rh.fbSingleMovieQuoteManager.beginListening(this.updateView.bind(this));
		$("#editQuoteDialog").on("show.bs.modal", function (e) {
			$("#inputQuote").val(rh.fbSingleMovieQuoteManager.quote);
			$("#inputMovie").val(rh.fbSingleMovieQuoteManager.movie);
		});
		$("#editQuoteDialog").on("shown.bs.modal", function (e) {
			$("#inputQuote").trigger("focus");
		});
		$("#menuSignOut").click((event) => {
			console.log("Sign out.");
			rh.fbAuthManager.signOut();
		});
		$("#submitEditQuote").click((event) => {
			const quote = $("#inputQuote").val();
			const movie = $("#inputMovie").val();
			rh.fbSingleMovieQuoteManager.update(quote, movie);
		});

		$("#deleteQuote").click((event) => {
			rh.fbSingleMovieQuoteManager.delete().then(() => {
				window.location.href = "/list.html";
			});
		});

	}

	updateView() {
		$("#cardQuote").html(rh.fbSingleMovieQuoteManager.quote);
		$("#cardMovie").html(rh.fbSingleMovieQuoteManager.movie);

		// Show edit and delete if allowed.
		if(rh.fbSingleMovieQuoteManager.uid == rh.fbAuthManager.uid) {
			$("#menuEdit").show();
			$("#menuDelete").show();
		}

	}
}

rh.FbAuthManager = class {
	constructor() {
		this._user = null;
		this.rfUser = null;
	}
	get uid() {
		if (this._user) {
			return this._user.uid;
		}
		console.log("There is no user!");
		return "";
	}

	get isSignIn() {
		return !!this._user;
	}

	beginListening(changeListener) {
		console.log("Listen for auth state changes");
		firebase.auth().onAuthStateChanged((user) => {
			this._user = user;
			changeListener();
		});
	}

	signIn() {
		// TODO: Make this method return a promise.
		// to make a promise Option #1: if there is already a promise use it!
		// Option #2: Construct a new Promise from scratch!

		return new Promise((resolve, reject) => {			
			console.log("Rosefire Sign in");
			Rosefire.signIn(rh.ROSEFIRE_REGISTRY_TOKEN, (err, rfUser) => {
				if (err) {
					console.log("Rosefire error.", err);
					reject();
					return;
				}
				console.log("Rosefire login worked!", rfUser);
				this.rfUser = rfUser;
				// Option #1 (which we won't do): Use the rfUser NOW and set a document in Firebase!
				firebase.auth().signInWithCustomToken(rfUser.token).then((authData) => {
					// User logged in successfully 
					console.log("Firebase auth worked too!");
					// resolve();

					rh.fbUserManager.setUser(rfUser).then(() => {
						resolve();
					})
				}, function (error) {
					// User not logged in!
					console.log("Firebase auth failed.  Dr. Fisher has never seen this happen.");
					reject();
				});
			});
		});
		
	}

	signOut() {
		firebase.auth().signOut();
	}
}

rh.LoginPageController = class {
	constructor() {
		$("#rosefireButton").click((event) => {
			rh.fbAuthManager.signIn().then(() => {
				console.log("Moved to the next page because of the promise");
				window.location.href = "/list.html";
			});
		});
	}
}

rh.FbUserManager = class {
	constructor() {
		this._collectionRef = firebase.firestore().collection(rh.COLLECTION_USERS);
		this._document = {};
		this._unsubscribe = null;
	}

	beginListening(uid, changeListener) {
		// TODO: Test this function!!!!
		console.log("Listening for user", uid);
		this._unsubscribe = this._collectionRef.doc(uid).onSnapshot((doc) => {
			if (doc.exists) {
				this._document = doc;
				console.log('doc.data() :', doc.data());
				if (changeListener) {
					changeListener();
				}
			} else {
				console.log("This user does not exist!");
			}
		});
	}

	stopListening() {
		this._unsubscribe();
	}

	setUser(rfUser) {
		// TODO: Set the User then return a promise, so that the Promise chain can continue.

		console.log("Set the user for ", rfUser.username);
		// Check to see if the User already exists
		const userRef = this._collectionRef.doc(rfUser.username);
		return userRef.get().then((document) => {
			if(document.exist) {
				// This user already exists.  This is a second login. Do nothing.
				return;
			} else {
				// Create this User and set the values in the Firestore
				return userRef.set({
					[rh.KEY_NAME]: rfUser.name
				});
			}
		});
	}

	updateName(name) {
		// TODO: Implement

		// this._ref.update({
		// 	[rh.KEY_QUOTE]: quote,
		// 	[rh.KEY_MOVIE]: movie,
		// 	[rh.KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now()
		// }).then((docRef) => {
		// 	console.log("The update is complete");
		// });
	}

	updatePhotoUrl(photoUrl) {
		// TODO: Implement
	}

	get name() {
		return this._document.get(rh.KEY_NAME);
	}

	get photoUrl() {
		return this._document.get(rh.KEY_PHOTO_URL);
	}
}

rh.ProfilePageController = class {
	constructor() {
		$("#menuSignOut").click((event) => {
			console.log("Sign out.");
			rh.fbAuthManager.signOut();
		});
		$("#updateProfilePhoto").click((event) => {
			console.log("TODO: Update profile photo");
		});

		$("#updateName").click((event) => {
			console.log("TODO: Update name");
		});
	}

	updateView() {

	}
}

rh.checkForRedirects = function () {
	// Redirects
	if ($("#login-page").length && rh.fbAuthManager.isSignIn && !rh.fbAuthManager.rfUser) {
		window.location.href = "/list.html";
	}
	if (!$("#login-page").length && !rh.fbAuthManager.isSignIn) {
		window.location.href = "/";
	}
}

rh.initializePage = function () {
	// Initialization
	var urlParams = new URLSearchParams(window.location.search);
	if ($("#list-page").length) {
		console.log("On the list page");
		const urlUid = urlParams.get('uid');
		rh.fbMovieQuotesManager = new rh.FbMovieQuotesManager(urlUid);
		new rh.ListPageController();
	} else if ($("#detail-page").length) {
		console.log("On the detail page");
		// const movieQuoteId = rh.storage.getMovieQuoteId();
		
		const movieQuoteId = urlParams.get('id');
		if (movieQuoteId) {
			rh.fbSingleMovieQuoteManager = new rh.FbSingleMovieQuoteManager(movieQuoteId);
			new rh.DetailPageController();
		} else {
			console.log("Missing a movie quote id");
			window.location.href = "/list.html";
		}
	} else if ($("#login-page").length) {
		console.log("On the login page.");
		new rh.LoginPageController();
	} else if ($("#profile-page").length) {
		console.log("On the profile page.");
		new rh.ProfilePageController();
	}
}

/* Main */
$(document).ready(() => {
	console.log("Ready");
	rh.fbAuthManager = new rh.FbAuthManager();
	rh.fbUserManager = new rh.FbUserManager();
	rh.fbAuthManager.beginListening(() => {
		console.log("Auth state changed. isSignedIn = ", rh.fbAuthManager.isSignIn);
		rh.checkForRedirects();
		rh.initializePage();
	});
});