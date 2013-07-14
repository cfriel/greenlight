UserInformation = new Meteor.Collection("user_information");

if (Meteor.isServer) {
    Meteor.startup(function () {

	UserInformation.remove({});

	for(var i = 0; i < 50; i++)
	{
	    UserInformation.insert({tags: ["all"], name: "User Name", description: "Lorem ipsum dolor sit amet", username : "user" + i, photo : i + ".jpg" });
	}
    });
}
