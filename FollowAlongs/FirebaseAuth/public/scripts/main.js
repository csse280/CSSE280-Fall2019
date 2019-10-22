/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Dave Fisher
 */

/** namespace. */
var rh = rh || {};

rh.beginAuthListening = function () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			$("#uid").html(`<b>uid</b>: ${user.uid}`);
			$("#email").html(`<b>email</b>: ${user.email}`);
			$("#displayName").html(`<b>displayName</b>: ${user.displayName}`);
			$("#photoURL").attr("src", user.photoURL);
			$("#phoneNumber").html(`<b>phone #</b>: ${user.phoneNumber}`);
			console.log(user.providerData);
			console.log("A user IS signed in.  Uid = ", user.uid);
			$("#emailPassword").hide();
			$("#userInfo").show();
		} else {
			// User is signed out.
			console.log("There is no user.  Nobody is signed in.");
			$("#emailPassword").show();
			$("#userInfo").hide();
		}
	});
}

rh.enableEmailPassword = function () {
	const email = new mdc.textField.MDCTextField(document.querySelector('.email'));
	const password = new mdc.textField.MDCTextField(document.querySelector('.password'));
	new mdc.ripple.MDCRipple(document.querySelector('#createAccount'));
	new mdc.ripple.MDCRipple(document.querySelector('#login'));

	$("#createAccount").click((event) => {
		const emailValue = $("#email-input").val();
		const passwordValue = $("#password-input").val();
		console.log("Create a new user", emailValue, passwordValue);
		firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue).catch(function (error) {
			// CONSIDER: In a real tell the user what is wrong.
			console.log(`Error ${error.code}: ${error.message}`);
		});
	});
	$("#login").click((event) => {
		console.log("Log in an existing user");
		const emailValue = $("#email-input").val();
		const passwordValue = $("#password-input").val();
		console.log("Create a new user", emailValue, passwordValue);
		firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue).catch(function (error) {
			// CONSIDER: In a real tell the user what is wrong.
			console.log(`Error ${error.code}: ${error.message}`);
		});
	});
};

/* Main */
$(document).ready(() => {
	console.log("Ready");
	// Kept for reference only
	// const topAppBarElement = document.querySelector('.mdc-top-app-bar');
	// const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);

	rh.enableEmailPassword();
	rh.beginAuthListening();

	$("#signOut").click((event) => {
		firebase.auth().signOut()
	});
});