/**
 *
 *
 */
greenlight.prototype.Adapter = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

};

Greenlight.Adapters = new Meteor.Collection("adapters");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("adapters"));

greenlight.prototype.Adapter.prototype = new Greenlight.Entity();
greenlight.prototype.Adapter.prototype.constructor = greenlight.prototype.Adapter;
Greenlight.Adapters.entity = greenlight.prototype.Adapter;

greenlight.prototype.Adapter.prototype.create = function()
{
};

greenlight.prototype.Adapter.prototype.register = function()
{
};

greenlight.prototype.Adapter.prototype.activate = function()
{
};

greenlight.prototype.Adapter.prototype.destroy = function()
{
};
