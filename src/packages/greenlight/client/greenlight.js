SiteTemplates = new Meteor.Collection("site_templates");

Deps.autorun(function(){
    Meteor.subscribe("site_templates");
});

Meteor.startup(function(){
    
});

greenlight = function(){};

greenlight.prototype = new greenlight();

greenlight.prototype.routes = {};

greenlight.prototype.register_site = function(site, callback)
{
    Meteor.call('register_site', site, function(err, res){

	if(!err)
	{
	    var template = SiteTemplates.findOne({ _id : site.template });

	    if(template)
	    {
		var route = Greenlight.map_route(site);

		if(route)
		{
		    Meteor.Router.add(route);
		}
	    }
	}
	
	callback(err, res);
    });
};

greenlight.prototype.log = function(format, args)
{
    console.log(sprintf(format, args));
}

greenlight.prototype.get_default_route = function(template)
{
    return this.routes[template._id];
};

greenlight.prototype.map_route = function(site)
{
    var url = site.url;
    var templateId = site.template;

    var template = SiteTemplates.findOne({ _id : templateId });

    if(template)
    {
	var path = '/' + url;
	
	var fun = this.get_default_route(site.template);

	var ret = {};
	ret[path] = fun;

	return ret;
    }

    return null;
};

greenlight.prototype.register_template = function(name, version, template)
{
    console.log("registering " + name + " with version " + version);

    var templateId;
    
    if(!SiteTemplates.findOne( { name: name, version: version }))
    {
	SiteTemplates.insert( { name : name, version : version }, function(err,id){
	    if(!err)
	    {
		templateId = id;
	    }
	} );
    }
    else
    {
	var t = SiteTemplates.findOne({ name: name, version: version});
	
	templateId = t._id;
    }
    
    if(templateId && template.default_route)
    {
	this.routes[templateId] = template.default_route['/'];
    }

    if(template.routes)
    {
	Meteor.Router.add(template.routes);
    }

    var f = function(n, v, t)
    {
	Deps.autorun(function(){
	    if(t.routes)
	    {
		var userId = Meteor.userId();
		var siteTemplate = SiteTemplates.findOne( { name: n, version: v});
		
		if(siteTemplate)
		{
		    var templateId = siteTemplate._id;


		    var sites = Greenlight.Sites.find
		    (
			{$and: 
			 [
			     { template : templateId }, 
			     { $or :
			       [
				   { users: {$in : [userId]} },
				   { owner: userId }
			       ]
			     }
			 ]
			}
		    ).fetch();
		    
    		    var keys = Object.keys(t.routes);
		    
		    for(var s = 0; s < sites.length; s++)
		    {
			var site = sites[s];
			
    			for(var i = 0; i < keys.length; i++)
    			{
    			    var key = keys[i];
    			    var route = t.routes[key];
			    
			    t.routes['/'+site.url+key]=route;
    			}

			if(t.default_route)
			{
			    t.routes['/' + site.url] = t.default_route['/'];
			}
		    }
		    
		    Meteor.Router.add(t.routes);
		}
	    }
	});
    };

    f(name,version,template);
};

Greenlight = greenlight.prototype;

Greenlight.Packages = {};