
if (Meteor.isServer) {
    Meteor.startup(function () {

	DataCollections = new Meteor.Collection("data_collections");

	DataCollections.remove({});

	for(var i = 0; i < 50; i++)
	{
	    DataCollections.insert({tags: ["all"], name: "Collection " + i, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ", owner: "user"+i});
	}
    });

}
