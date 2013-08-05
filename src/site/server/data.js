Data = new Meteor.Collection("data");
    
Meteor.startup(function(){
    
    Meteor.publish("data", function(){
	return Data.find();
    });

    
});