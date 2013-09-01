greenlight.prototype.Transform = function()
{
};

greenlight.prototype.Transform.prototype = new Greenlight.Entity();
greenlight.prototype.Transform.prototype.constructor = greenlight.prototype.Transform;

Greenlight.Transforms = new Meteor.Collection("transforms");

Meteor.publish("transforms", function(){
    return Greenlight.Transforms.find();
});

Greenlight.Transforms.allow({

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