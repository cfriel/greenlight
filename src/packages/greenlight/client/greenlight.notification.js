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
greenlight.prototype.Notification = function()
{
    var title = null;
    var contents = null;
    var source = null;
    var audience = null;
    var created = null;
    var routes = null;
};

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
