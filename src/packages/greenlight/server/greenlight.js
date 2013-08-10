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


greenlight.prototype.get_templates = function()
{
    return SiteTemplates.find();
};

greenlight.prototype.register_site = function(site)
{
    console.log("Registering user site");
    
    if(!Sites.findOne({ url : site.url }))
    {
	Sites.insert(site);
	return site;
    }
    else
    {
	return null;
    }
};

Greenlight = greenlight.prototype;

Meteor.methods({
    
    register_site : function(site)
    {
	return Greenlight.register_site(site);
    }
    
});

Meteor.startup(function () {
    
    Greenlight.Helpers.load_item(
	'mongodb://127.0.0.1:27017/',
	'examples',
	'rounds',
	ObjectID('52044617e71700ea13012575'));

    Greenlight.Helpers.load_data(
	'mongodb://127.0.0.1:27017/',
	'examples',
	'rounds',
	{},
	0,
	100);

    Greenlight.Helpers.load_databases(
	'mongodb://127.0.0.1:27017/'
    );

    var schema = 
	Greenlight.Helpers.analyze_schema(
	'mongodb://127.0.0.1:27017/',
	'examples',
	'rounds'
    );

    Greenlight.log(JSON.stringify(schema), []);

    Greenlight.Helpers.load_schema(
	'mongodb://127.0.0.1:27017/',
	'examples',
	'rounds'
    );

});

