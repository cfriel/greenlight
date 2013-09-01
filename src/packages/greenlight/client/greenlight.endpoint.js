/**
 *
 *
 */
greenlight.prototype.Endpoint = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

};

Greenlight.Endpoints = new Meteor.Collection("endpoints");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("endpoints"));

greenlight.prototype.Endpoint.prototype = new Greenlight.Entity();
greenlight.prototype.Endpoint.prototype.constructor = greenlight.prototype.Endpoint;
Greenlight.Endpoints.entity = greenlight.prototype.Endpoint;

greenlight.prototype.Endpoint.prototype.create = function()
{
};

greenlight.prototype.Endpoint.prototype.register = function()
{
};

greenlight.prototype.Endpoint.prototype.activate = function()
{
};

greenlight.prototype.Endpoint.prototype.destroy = function()
{
};
