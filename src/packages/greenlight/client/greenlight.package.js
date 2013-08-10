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
greenlight.prototype.Package = function()
{
    var version = null;
    var name = null;
    var description = null;
    var thumbnail = null;
    var metadata = null;
    var source = null;
    var registered = null;
    var core = null;
    var expires = null;
    var instantiable = null;
};

greenlight.prototype.Package.prototype = new Greenlight.Entity();
greenlight.prototype.Package.prototype.constructor = greenlight.prototype.Package;

greenlight.prototype.Package.prototype.create = function()
{
};

greenlight.prototype.Package.prototype.instantiate = function()
{
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
