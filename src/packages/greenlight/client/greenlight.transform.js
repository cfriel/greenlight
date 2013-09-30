/**
 *
 *
 */
greenlight.prototype.Transform = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

};

Greenlight.Transforms = new Meteor.Collection("transforms");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("transforms"));

greenlight.prototype.Transform.prototype = new Greenlight.Entity();
greenlight.prototype.Transform.prototype.constructor = greenlight.prototype.Transform;
Greenlight.Transforms.entity = greenlight.prototype.Transform;

greenlight.prototype.Transform.prototype.save = function()
{
    var self = this;

    Greenlight.Transforms.insert({ owner: Meteor.userId(), 
				  name: self.name,
				  configuration: self.configuration});
};

greenlight.prototype.Transform.prototype.create = function()
{

};

greenlight.prototype.Transform.prototype.register = function()
{
};

greenlight.prototype.Transform.prototype.activate = function()
{
};

greenlight.prototype.Transform.prototype.destroy = function()
{
};
