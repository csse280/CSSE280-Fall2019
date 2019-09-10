$(document).ready(function() {
    console.log("Wait until the DOM is ready");

    $("#my-text").click(function() {
        console.log("You clicked the div");

        $(this).html("Web apps are fun!");
        $(this).toggleClass("small-width");
    });
});
