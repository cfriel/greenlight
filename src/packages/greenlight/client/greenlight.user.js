/**
 *
 * A user is an extended (technically via encapsulated) version
 * of a user from meteor.  It adds functionality for following,
 * followers, and various other social pieces, or helpers around
 * social pieces.  By convention the id is equal to the meteor id.
 *
 **/
greenlight.prototype.User = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

    // this.id = id;
};

Greenlight.Users = Meteor.users;

Deps.autorun(function(){
    Meteor.subscribe("users");
});

greenlight.prototype.User.prototype = new Greenlight.Entity();
greenlight.prototype.User.prototype.constructor = greenlight.prototype.User;
Greenlight.Users.entity = greenlight.prototype.User;

greenlight.prototype.User.prototype.save = function()
{
    var self = this;
};

greenlight.prototype.User.prototype.follow = function()
{
};
