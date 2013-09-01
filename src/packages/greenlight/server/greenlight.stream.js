greenlight.prototype.Stream = function()
{
};

greenlight.prototype.Stream.prototype = new Greenlight.Entity();
greenlight.prototype.Stream.prototype.constructor = greenlight.prototype.Stream;

Greenlight.Streams = new Meteor.Collection("streams");

Meteor.publish("streams", function(){
    return Greenlight.Streams.find();
});

Greenlight.Streams.allow({

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