/**
 *
 *
 */
greenlight.prototype.Stream = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

};

Greenlight.Streams = new Meteor.Collection("streams");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("streams"));

greenlight.prototype.Stream.prototype = new Greenlight.Entity();
greenlight.prototype.Stream.prototype.constructor = greenlight.prototype.Stream;
Greenlight.Streams.entity = greenlight.prototype.Stream;

greenlight.prototype.Stream.prototype.create = function()
{
};

greenlight.prototype.Stream.prototype.register = function()
{
};

greenlight.prototype.Stream.prototype.activate = function()
{
};

greenlight.prototype.Stream.prototype.destroy = function()
{
};
