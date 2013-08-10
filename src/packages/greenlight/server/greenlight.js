SiteTemplates = new Meteor.Collection("site_templates");

Meteor.publish("site_templates", function(){
    return SiteTemplates.find();
});

var mongo = Npm.require('mongodb');
var ObjectID = Npm.require('mongodb').ObjectID;

greenlight = function(){};

greenlight.prototype = new greenlight();

greenlight.prototype.log = function(format, args)
{
    console.log(vsprintf(format, args));
}

greenlight.prototype.register_template = function(name, version, template)
{
    console.log("registering " + name + " with version " + version);
    
    if(!SiteTemplates.findOne( { name: name, version: version }))
    {
	SiteTemplates.insert( { name : name, version : version, metadata: template.metadata });
    }
};


greenlight.prototype.init = function()
{
    Greenlight.Helpers.load_and_analyze_databases(
	'mongodb://127.0.0.1:27017/'
    );
    
};

greenlight.prototype.get_templates = function()
{
    return SiteTemplates.find();
};
 
greenlight.prototype.register_site = function(site)
{
    console.log("Registering user site");
    
    if(!Greenlight.Sites.findOne({ url : site.url }))
    {
	Greenlight.Sites.insert(site);
	return site;
    }
    else
    {
	return null;
    }
};

Meteor.methods({
    
    register_site : function(site)
    {
	return Greenlight.register_site(site);
    }
    
});

Greenlight = greenlight.prototype;
Greenlight.Packages = {};

Meteor.startup(function () {
    
    Greenlight.init();

});

