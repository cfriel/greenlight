Databases = new Meteor.Collection("databases");

Meteor.startup(function(){
    
    Meteor.publish("databases", function(){
	return Databases.find();
    });
    
});


