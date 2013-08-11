/**
 *
 * Processes are long-running items in the platform,
 * for example data feeds or data synchronization processes.
 * In the feeds and quality packages, they might be a feed or
 * a data mastering process, respectively.  
 */
greenlight.prototype.Process = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

};

Greenlight.Processes = new Meteor.Collection("processes");

Deps.autorun(function(){
    Meteor.subscribe("processes");
});

greenlight.prototype.Process.prototype = new Greenlight.Entity();
greenlight.prototype.Process.prototype.constructor = greenlight.prototype.Process;
Greenlight.Processes.entity = greenlight.prototype.Process;

greenlight.prototype.Process.prototype.create = function()
{
};

greenlight.prototype.Process.prototype.destroy = function()
{
};

greenlight.prototype.Process.prototype.start = function()
{
};

greenlight.prototype.Process.prototype.stop = function()
{
};



