/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author 
 */

/** namespace. */
var rh = rh || {};

/** globals */
rh.docRef = null;
rh.FB_KEY_COLOR = "color";
rh.FB_KEY_NUMBER = "number";
rh.FB_KEY_IS_TABS = "isTabs";


/** function and class syntax examples */
rh.beginListening = function () {
	
	rh.docRef.onSnapshot(function(doc) {

		if (doc.exists) {
			console.log("Document data:", doc.data());
			const color = doc.get(rh.FB_KEY_COLOR);
			const number = doc.get(rh.FB_KEY_NUMBER);
			const isTabs = doc.get(rh.FB_KEY_IS_TABS);

			console.log("Received: ", color, typeof(color));
			console.log("Received: ", number, typeof(number));
			console.log("Received: ", isTabs, typeof(isTabs));

			$("#favorite-color").html(color);
			$("#favorite-number").html(number);
			$("#favorite-indent").html(isTabs ? "Tabs" : "Spaces");

		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
			$("#favorite-color").html("unknown");
			$("#favorite-number").html("unknown");
			$("#favorite-indent").html("unknown");
		}

        
    });

};

/* Main */
$(document).ready(() => {
	console.log("Ready");
	rh.docRef = firebase.firestore().collection("FavoriteThings").doc("mine");
	rh.beginListening();

});
