/**
 *
 * A service is a local (within the web platform) or 
 * remote (hosted on a server) method or set of methods
 * that can be called from within the platform.
 *
 */
greenlight.prototype.Service = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

    // var name = null;
    // var parameters = null;
    // var sample = null;
    // var entitlements = null;
    // var status = null;
    // var created = null;
    // var owner = null;
};

Greenlight.Services = new Meteor.Collection("services");

Deps.autorun(function(){
    Meteor.subscribe("services");
});

greenlight.prototype.Service.prototype = new Greenlight.Entity();
greenlight.prototype.Service.prototype.constructor = greenlight.prototype.Service;
Greenlight.Services.entity = greenlight.prototype.Service;

greenlight.prototype.Service.prototype.create = function()
{
};

greenlight.prototype.Service.prototype.start = function()
{
};

greenlight.prototype.Service.prototype.stop = function()
{
};

greenlight.prototype.Service.prototype.heartbeat = function()
{
};

greenlight.prototype.Service.prototype.destroy = function()
{
};

