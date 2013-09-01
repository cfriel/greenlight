/*
 *
 * The notification class is meant for creating
 * message notifications to be delivered to audiences
 * of users through various transports.  An example of
 * a notification would be notifying a user on the sheets page
 * that another user is viewing the page.  This notification
 * could be delivered to the owner himself if he's using the 
 * site at the time, or delivered over email.
 *
 */
greenlight.prototype.Notification = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

    // var title = null;
    // var contents = null;
    // var source = null;
    // var audience = null;
    // var created = null;
    // var routes = null;
};

Greenlight.Notifications = new Meteor.Collection("notifications");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("notifications"));

greenlight.prototype.Notification.prototype = new Greenlight.Entity();
greenlight.prototype.Notification.prototype.constructor = greenlight.prototype.Notification;
Greenlight.Notifications.entity = greenlight.prototype.Notification;

greenlight.prototype.Notification.prototype.create = function()
{
};

greenlight.prototype.Notification.prototype.send = function()
{
};

greenlight.prototype.Notification.prototype.cancel = function()
{
};

greenlight.prototype.Notification.prototype.destroy = function()
{
};

greenlight.prototype.Notification.prototype.save = function()
{
    var self = this;

    Greenlight.Notifications.insert({ owner: Meteor.userId(), 
				      url: self.url,
				      audience: self.audience });
};
