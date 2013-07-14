Template.create_pending_page.rendered = function() {
    Meteor.defer(function () {
	setTimeout(function(){
	    $("#progress_text").text("Configuring database dependencies");
	    $("#progress_bar").css("width", "20%");
	    setTimeout(function(){
		$("#progress_text").text("Setting up template");
		$("#progress_bar").css("width", "40%");
		setTimeout(function(){
		    $("#progress_text").text("Granting user access");
		    $("#progress_bar").css("width", "60%");
		    setTimeout(function(){
			$("#progress_text").text("Setting up site at url foo.greenlight.com");
			$("#progress_bar").css("width", "80%");
			setTimeout(function(){
			    $("#progress_text").text("Ready to go!");
			    $("#progress_bar").css("width", "100%");
			    window.location.href = "/create/completed";
			}, 2000);
		    }, 2000);
		}, 2000);
	    }, 2000);
	}, 2000);
    });
    return "";
}