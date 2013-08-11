greenlight = function(){};

greenlight.prototype = new greenlight();

greenlight.prototype.routes = {};

greenlight.prototype.register_site = function(site, callback)
{
    Meteor.call('register_site', site, function(err, res){

	if(!err)
	{
	    var template = Greenlight.Packages.findOne({ _id : site.template });

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

    var template = Greenlight.Packages.findOne({ _id : templateId });

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

greenlight.prototype.register_package = function(name, version, template)
{
    console.log("registering " + name + " with version " + version);

    var templateId;
    
    if(!Greenlight.Packages.findOne( { name: name, version: version }))
    {
	Greenlight.Packages.insert( { name : name, version : version }, function(err,id){
	    if(!err)
	    {
		templateId = id;
	    }
	} );
    }
    else
    {
	var t = Greenlight.Packages.findOne({ name: name, version: version});
	
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
		var siteTemplate = Greenlight.Packages.findOne( { name: n, version: v});
		
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
			    //t.routes['/' + site.url] = t.default_route['/'];
			}
		    }
		    
		    Meteor.Router.add(t.routes);
		}
	    }
	});
    };

    f(name,version,template);
};

greenlight.prototype.init = function()
{
    this.instantiate_sites();
};

greenlight.prototype.instantiate_sites = function()
{
    Deps.autorun(function(){
    
	// for this user, loop over all of the sites
	// that he owns or is entitled to, and instantiate
	// them by url
	var userId = Meteor.userId();

	if(userId)
	{
	    var owned = Greenlight.Sites.find( { owner : userId }).fetch();
	    var user = Greenlight.Sites.find( { users : {$in : [userId]}} ).fetch();

	    var sites = {};

	    for(var i = 0; i < owned.length; i++)
	    {
		sites[owned._id] = owned[i];
	    }

	    for(var i = 0; i < user.length; i++)
	    {
		sites[user._id] = user[i];
	    }

	    var keys = Object.keys(sites);

	    for(var i = 0; i < keys.length; i++)
	    {
		var site = sites[keys[i]];

		var s = new Greenlight.Site(site);

		var pkg = Greenlight.Packages.findOne({ _id: site.template });

		if(pkg)
		{
		    Greenlight.log("Instantiating %s, %s, %s", [site.template, site.url, pkg.name]);

		    var obj = new Greenlight.Package(pkg);

		    obj.instantiate(s);
		}
	    }
	    
	}

    });

};

Greenlight = greenlight.prototype;

Meteor.startup(function(){
    
    Greenlight.init();
 
});

