/**
 *
 * A server is either a platform server or a remote
 * (from the perspective of the process) host for a 
 * service.  In the hosted environment, servers are 
 * relevant as well.
 *
 */
greenlight.prototype.Server = function()
{
    var name = null;
    var type = null;
    var url = null;
    var ip = null;
    var port = null;
    var owner = null;
    var created = null;
};

greenlight.prototype.Server.prototype = new Greenlight.Entity();
greenlight.prototype.Server.prototype.constructor = greenlight.prototype.Server;

greenlight.prototype.Server.prototype.create = function()
{
};

greenlight.prototype.Server.prototype.destroy = function()
{
};
