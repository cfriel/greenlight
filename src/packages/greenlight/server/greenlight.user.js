greenlight.prototype.User = function()
{
};

greenlight.prototype.User.prototype = new Greenlight.Entity();
greenlight.prototype.User.prototype.constructor = greenlight.prototype.User;

Meteor.publish("users", function(){
    return Meteor.users.find();
});

Meteor.users.allow({

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
