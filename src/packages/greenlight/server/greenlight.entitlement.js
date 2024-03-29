greenlight.prototype.Entitlement = function()
{
};

greenlight.prototype.Entitlement.prototype = new Greenlight.Entity();
greenlight.prototype.Entitlement.prototype.constructor = greenlight.prototype.Entitlement;

Greenlight.Entitlements = new Meteor.Collection("entitlements");

Meteor.publish("entitlements", function(){
    return Greenlight.Entitlements.find();
});

Greenlight.Entitlements.allow({

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