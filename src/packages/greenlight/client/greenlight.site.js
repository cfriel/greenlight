/**
 *
 * A site is a grafted-on instance of a site template
 * owned by a specific user and accessible by other users.
 * Users create instances of sites using site templates
 * they have access to, and attached to the sites are 
 * certain resources such as activity streams and datasets.
 * Site data can be packaged and migrated.
 *
 */
greenlight.prototype.Site = function()
{
    var name = null;
    var created = null;
    var modified = null;
    var owner = null;
    var url = null;
    var users = null;
    var description = null;
};

greenlight.prototype.Site.prototype.create = function()
{
};

greenlight.prototype.Site.prototype.navigate = function()
{
};

greenlight.prototype.Site.prototype.authorize = function()
{
};

greenlight.prototype.Site.prototype.destroy = function()
{
};

greenlight.prototype.Site.prototype.start = function()
{
};

greenlight.prototype.Site.prototype.stop = function()
{
};


