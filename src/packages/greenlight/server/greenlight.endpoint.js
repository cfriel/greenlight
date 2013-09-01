greenlight.prototype.Endpoint = function()
{
};

greenlight.prototype.Endpoint.prototype = new Greenlight.Entity();
greenlight.prototype.Endpoint.prototype.constructor = greenlight.prototype.Endpoint;

Greenlight.Endpoints = new Meteor.Collection("endpoints");

Meteor.publish("endpoints", function(){
    return Greenlight.Endpoints.find();
});

Greenlight.Endpoints.allow({

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