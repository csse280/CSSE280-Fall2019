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

	static NUM_SQUARES = 9;
	static Mark = {
		X: "X",
		O: "O",
		NONE: " "
	}

	static State = {
		X_TURN: "X's Turn",
		O_TURN: "O's Turn",
		X_WIN: "X Wins!",
		O_WIN: "O Wins!",
		TIE: "Tie Game"
	}

	constructor() {
		this.board = []; // Array of 9 marks "X" "O" or " "
		for (let k = 0; k < rh.Game.NUM_SQUARES; k++) {
			this.board[k] = rh.Game.Mark.NONE;
		}
		this.state = rh.Game.State.X_TURN; // Enums object X_TURN, O_TURN, X_WIN, O_WIN, TIE_GAME
	}

	pressedButtonAtIndex(buttonIndex) {
		// Controller is telling the Model to make a change

		// Quick hack to be replaced later.
		this.board[buttonIndex] = rh.Game.Mark.X;
		this.state = rh.Game.State.X_WIN;

	}

	getMarkAtIndex(buttonIndex) {
		// Returns "X", "O", or " " for this square.
		return this.board[buttonIndex];
	}

	// getState() {
	// 	// Returns a string for the game state.
	// 	return this.state;
	// }
}

rh.PageController = class {
	constructor() {
		this.game = new rh.Game();

		// If you wanted to implement the model object first you'd do something like this
		// console.log("Test mark", this.game.getMarkAtIndex(3));
		// console.log('this.game.board :', this.game.board);
		// console.log('this.game.state :', this.game.state);
		// this.game.pressedButtonAtIndex(3);
		// console.log("Test mark", this.game.getMarkAtIndex(3));
		// console.log('this.game.board :', this.game.board);
		// console.log('this.game.state :', this.game.state);
		// this.game.pressedButtonAtIndex(2);
		// console.log('this.game.board :', this.game.board);
		// console.log('this.game.state :', this.game.state);

		const that = this;
		$(".square").click(function() {
			// const buttonId = this.id.substring(6);
			const buttonId = $(this).data("id");
			that.game.pressedButtonAtIndex(buttonId);
			that.updateView();
		});
		$("#new-game-button").click(() => {
			this.game = new rh.Game();
			this.updateView();
		});
		this.updateView();
	}

	updateView() {
		// Use the Game Model object to update the View
		$("#game-state-text").html(this.game.state);
		$(".square").each((index, item) => {
			$(item).html(this.game.getMarkAtIndex(index));
		});
	}
}

/* Main */
$(document).ready(() => {
	console.log("Ready");
	new rh.PageController();
});