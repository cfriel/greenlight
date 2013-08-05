Meteor.startup(function(){

    for(var i = 0; i < 100; i++)
    {
	var username = "cfriel_" + i;;
	var email = "cfriel+" + i + "@gmail.com";
	var password = "password";
	var profile = { name: "Chris Friel" };

	if(!Meteor.users.find({username : username}))
	{
	    Accounts.createUser({username: username, email: email, password: password, profile: profile});
	}
    }

});

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});