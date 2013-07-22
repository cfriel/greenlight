if (Meteor.isServer) {
    Meteor.startup(function () {

	SiteTemplates = new Meteor.Collection("site_templates");

	SiteTemplates.remove({});

	for(var i = 0; i < 50; i++)
	{
	    SiteTemplates.insert({tags: ["all"], name: "Site Template " + i, description: "Lorem ipsum dolor sit amet, consectetur adipisicing. ", owner: "user"+i, id: i});
	}

	console.log("publishing site templates");

	Meteor.publish("site_templates", function(){
	    return SiteTemplates.find();
	});
    });

}

