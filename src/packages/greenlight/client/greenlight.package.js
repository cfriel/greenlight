/**
 *
 * The package functionality is the extensibility
 * model for the platform.  Packages can be added to the
 * system, which are typically meteorite packages enhanced
 * with additional information specific to greenlight.  Examples
 * of packages are site templates, services packages, 
 * packages for interfacing with external services,
 * hosting, etc.  Packages can either be instantiable, 
 * meaning that a user can create an instance of a site
 * based on the package, or not.  Packages have a registration
 * mechanism to license check.
 *
 */
greenlight.prototype.Package = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

    // var version = null;
    // var name = null;
    // var description = null;
    // var thumbnail = null;
    // var metadata = null;
    // var source = null;
    // var registered = null;
    // var core = null;
    // var expires = null;
    // var instantiable = null;
};

Greenlight.Packages = new Meteor.Collection("packages");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("packages"));

greenlight.prototype.Package.prototype = new Greenlight.Entity();
greenlight.prototype.Package.prototype.constructor = greenlight.prototype.Package;
Greenlight.Packages.entity = greenlight.prototype.Package;

greenlight.prototype.Package.prototype.create = function()
{
};

greenlight.prototype.Package.prototype.instantiate = function(site)
{
    Greenlight.log("Instantiating site %s", [site]);
    
    var keys = Object.keys(Greenlight.Packages);

    for(var i = 0; i < keys.length; i++)
    {
	var key = keys[i];
	var obj = Greenlight.Packages[key];

	var className = this.name;

	if(key.toLowerCase() == className.toLowerCase())
	{
	    // found class
	    var pkg = new (Greenlight.Packages[key].constructor)(this);

	    if(pkg.__proto__.instantiate != this.instantiate)
	    {
		pkg.__proto__.instantiate(site);
	    }

	    return;
	}
    }

};

greenlight.prototype.Package.prototype.register = function()
{
};

greenlight.prototype.Package.prototype.activate = function()
{
};

greenlight.prototype.Package.prototype.destroy = function()
{
};
