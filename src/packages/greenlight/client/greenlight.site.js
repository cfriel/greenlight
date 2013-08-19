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
greenlight.prototype.Site = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

    // var name = null;
    // var created = null;
    // var modified = null;
    // var owner = null;
    // var url = null;
    // var users = null;
    // var description = null;
};

Greenlight.Sites = new Meteor.Collection("sites");

Deps.autorun(function(){
    Meteor.subscribe("sites");
});

greenlight.prototype.Site.prototype = new Greenlight.Entity();
greenlight.prototype.Site.prototype.constructor = greenlight.prototype.Site;
Greenlight.Sites.entity = greenlight.prototype.Site;

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

greenlight.prototype.Site.prototype.attach = function(name, attachment)
{
    var self = this;
    
    if(!self.attachments)
    {
	self.attachments = {};
    }

    self.attachments[name] = attachment;

    Greenlight.Sites.update({_id: self._id}, {$set : {attachments: self.attachments}});
};

