greenlight.prototype.Server = function()
{
};

greenlight.prototype.Server.prototype = new Greenlight.Entity();
greenlight.prototype.Server.prototype.constructor = greenlight.prototype.Server;

Greenlight.Servers = new Meteor.Collection("servers");

Meteor.publish("servers", function(){
    return Greenlight.Servers.find();
});

Greenlight.Servers.allow({

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