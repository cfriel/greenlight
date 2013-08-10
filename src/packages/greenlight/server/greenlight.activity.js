greenlight.prototype.Activity = function()
{
};

greenlight.prototype.Activity.prototype = new Greenlight.Entity();
greenlight.prototype.Activity.prototype.constructor = greenlight.prototype.Activity;

Greenlight.Activities = new Meteor.Collection("activities");

Meteor.publish("activities", function(){
    return Greenlight.Activities.find();
});

Greenlight.Activities.allow({

    insert: function (userId, doc) {
	
	return (userId && doc.owner === userId);
    },

    update: function (userId, doc, fields, modifier) {
	
	return doc.owner === userId;
    },

    remove: function (userId, doc) {
	
	return doc.owner === userId;
    },

    fetch: ['owner']    
});