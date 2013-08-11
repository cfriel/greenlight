/**
 *
 * The audience class provides functionality to 
 * aggregrate a group of users or notifiable parties
 * into one basket.  Audiences are named and consist of
 * a combination of users, groups, which can be specified
 * by id or by regex.
 */

greenlight.prototype.Audience = function()
{
    if(obj)
    {
	this.init(obj);
    }

    // var name = null;
    // var created = null;
    // var users = [];
    // var groups = [];
};

Greenlight.Audiences = new Meteor.Collection("audiences");

Deps.autorun(function(){
    Meteor.subscribe("audiences");
});

greenlight.prototype.Audience.prototype = new Greenlight.Entity();
greenlight.prototype.Audience.prototype.constructor = greenlight.prototype.Audience;
Greenlight.Audiences.entity = greenlight.prototype.Audience;

greenlight.prototype.Audience.prototype.create = function()
{
};

greenlight.prototype.Audience.prototype.destroy = function()
{
};

