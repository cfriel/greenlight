greenlight.prototype.Activity = function()
{
};

greenlight.prototype.Activity.prototype = new Greenlight.Entity();

Activities = new Meteor.Collection("activities");

Meteor.publish("activities", function(){
    return Activities.find();
});

Activities.allow({

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
