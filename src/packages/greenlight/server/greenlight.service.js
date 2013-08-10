greenlight.prototype.Service = function()
{
};

greenlight.prototype.Service.prototype = new Greenlight.Entity();
greenlight.prototype.Service.prototype.constructor = greenlight.prototype.Service;

Services = new Meteor.Collection("services");

Meteor.publish("services", function(){
    return Services.find();
});

Services.allow({

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