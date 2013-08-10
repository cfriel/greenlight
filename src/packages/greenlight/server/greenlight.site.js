greenlight.prototype.Site = function()
{
};

greenlight.prototype.Site.prototype = new Greenlight.Entity();
greenlight.prototype.Site.prototype.constructor = greenlight.prototype.Site;

Greenlight.Sites = new Meteor.Collection("sites");

Meteor.publish("sites", function(){
    return Greenlight.Sites.find();
});

Greenlight.Sites.allow({

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