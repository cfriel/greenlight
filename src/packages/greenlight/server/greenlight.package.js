greenlight.prototype.Package = function()
{
};

greenlight.prototype.Package.prototype = new Greenlight.Entity();
greenlight.prototype.Package.prototype.constructor = greenlight.prototype.Package;

Packages = new Meteor.Collection("packages");

Meteor.publish("packages", function(){
    return Packages.find();
});

Packages.allow({

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