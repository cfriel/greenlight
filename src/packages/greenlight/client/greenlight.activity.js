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
greenlight.prototype.Activity = function(title, description, source, audience)
{
    this.created = new Date().getTime();
    this.start = null;
    this.end = null;
    this.title = title;
    this.description = description;
    this.audience = audience;
    this.source = source;
    this.updates = [];
};

Activities = new Meteor.Collection("activities");

Deps.autorun(function(){
    Meteor.subscribe("activities");
});

greenlight.prototype.Activity.prototype = new Greenlight.Entity();
greenlight.prototype.Activity.prototype.constructor = greenlight.prototype.Activity;

greenlight.prototype.Activity.prototype.save = function()
{
    var self = this;

    Activities.insert({ owner: Meteor.userId(), created: self.created, title: self.title, description: self.description, source: self.source, audience: self.audience });
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

