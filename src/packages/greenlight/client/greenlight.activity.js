/**
 *
 * The activity class provides functionlity supporting activity
 * streams.  Activities start and end, and can be updated
 * throughout their duration with additional information.  An
 * example of an activity is a user viewing a page, or editing
 * a piece of information.  Activities can be filtered by type
 * or audience and shown in an activity stream.
 *
 **/
greenlight.prototype.Activity = function(obj)
{
    if(obj)
    {
    	this.init(obj);
    }

    // this.created = new Date().getTime();
    // this.start = null;
    // this.end = null;
    // this.title = title;
    // this.description = description;
    // this.audience = audience;
    // this.source = source;
    // this.updates = [];
};

Greenlight.Activities = new Meteor.Collection("activities");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("activities"));

greenlight.prototype.Activity.prototype = new Greenlight.Entity();
greenlight.prototype.Activity.prototype.constructor = greenlight.prototype.Activity;
Greenlight.Activities.entity = greenlight.prototype.Activity;

greenlight.prototype.Activity.prototype.save = function()
{
    var self = this;

    Greenlight.Activities.insert({ owner: Meteor.userId(), 
				   created: self.created, title: self.title, 
				   description: self.description, source: self.source, 
				   audience: self.audience });
};

greenlight.prototype.Activity.prototype.start = function()
{
};

greenlight.prototype.Activity.prototype.end = function()
{
};

greenlight.prototype.Activity.prototype.watch = function()
{
};

greenlight.prototype.Activity.prototype.update = function()
{
};

greenlight.prototype.Activity.prototype.destroy = function()
{
};

