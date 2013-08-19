Template.share.rendered = function()
{
    var site = Session.get("site");
    
    if(site)
    {    
	bindUsers();
    }    
};


var bindUsers = function()
{
    var select2 = $("#share").select2({
        minimumInputLength: 1,
	multiple: true,
	
        query: function (query) {	    
	    var data = {results: []}, i, j, s;

	    var users = Meteor.users.find().fetch();

	    for(var i = 0; i < users.length; i++)
	    {
		var emails = users[i].emails;
		var user = users[i];

		for(var j = 0; j < emails.length; j++)
		{   
		    var email = emails[j];
		    var keys = Object.keys(email);
		    
		    for(var k = 0; k < keys.length; k++)
		    {
			var key = keys[k];
			var item = email[key];

			if(item && typeof(item) == "string")
			{
			    if(query.term.length == 0 || item.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
				data.results.push({id: user._id, text: email.address });
			    }
			}
		    }	    
		}
	    }

	    query.callback(data);
	}
    });


    if(!share)
    {
	share = $('#share');

	$('#share').on("change", function(e) { 
	    Greenlight.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
	
	    var pg = document.location.pathname;
	    var userId = e.added.id;
	    var user = Meteor.users.findOne({_id: userId});

	    if(user)
	    {
		var title = "Share page";
		var audience = userId;
		var url = pg;

		var notification = new Greenlight.Notification({ title: title, audience: audience, url: url});
		
		notification.save();		
	    }
	});
    }
};

var share;

Template.share.events = {
    
    'click #share-button' : function()
    {
	$('#share').select2("val","");
	$('#share-controls').toggle();
    }

};