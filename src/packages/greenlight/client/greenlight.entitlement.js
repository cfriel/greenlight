/*
 *
 * The entitlement class is used for authorizing
 * users to specific resources.  Users are entitled
 * to access a resource or perform an action.  Access
 * to these resources or actions can be allowed or
 * denied, and the assertions are processed in order
 * to determine access.  For example, if a user is entitled
 * to add items to a collection, but only delete
 * items he or she added, the entitlement would
 * allow add, then deny delete, then allow delete
 * for items owned by the user.
 */
greenlight.prototype.Entitlement = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

    // var name = null;
    // var action = null;
    // var resource = null;
    // var operation = null;
    // var created = null;
};

Greenlight.Entitlements = new Meteor.Collection("entitlements");

Deps.autorun(function(){
    Meteor.subscribe("entitlements");
});

greenlight.prototype.Entitlement.prototype = new Greenlight.Entity();
greenlight.prototype.Entitlement.prototype.constructor = greenlight.prototype.Entitlement;
Greenlight.Entitlements.entity = greenlight.prototype.Entitlement;

greenlight.prototype.Entitlement.prototype.create = function()
{
};

greenlight.prototype.Entitlement.prototype.destroy = function()
{
};
