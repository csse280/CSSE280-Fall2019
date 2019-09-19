/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author David Fisher
 */

/** namespace. */
var rh = rh || {};

/** globals */


rh.Game = class {
	constructor() {
		this.board = [];  // Array of 9 marks "X" "O" or " "
		this.state = ""; // Enums object X_TURN, O_TURN, X_WIN, O_WIN, TIE_GAME

	}
	pressedButtonAtIndex(buttonIndex) {
		// Controller is telling the Model to make a change

	}
	getMarkAtIndex(buttonIndex) {
		// Returns "X", "O", or " " for this square.
	}
	getState() {
		// Returns a string for the game state.
	}
}

rh.PageController = class {
	constructor() {
		this.game = new rh.Game();
	}
	updateView() {
		// Use the Game Model object to update the View

	}
}

/* Main */
$(document).ready(() => {
	console.log("Ready");
	new PageController();
});
