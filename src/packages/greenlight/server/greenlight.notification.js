 greenlight.prototype.Notification = function()
{
};

greenlight.prototype.Notification.prototype = new Greenlight.Entity();
greenlight.prototype.Notification.prototype.constructor = greenlight.prototype.Notification;

Greenlight.Notifications = new Meteor.Collection("notifications");

Meteor.publish("notifications", function(){
    return Greenlight.Notifications.find();
});

Greenlight.Notifications.allow({

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