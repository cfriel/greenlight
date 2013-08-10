greenlight.prototype.Audience = function()
{
};

greenlight.prototype.Audience.prototype = new Greenlight.Entity();
greenlight.prototype.Audience.prototype.constructor = greenlight.prototype.Audience;

Audiences = new Meteor.Collection("audiences");

Meteor.publish("audiences", function(){
    return Audiences.find();
});

Audiences.allow({

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