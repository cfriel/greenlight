Greenlight = {};

greenlight = function(){};

greenlight.prototype = new greenlight();

greenlight.prototype.routes = {};

greenlight.prototype.SubscriptionHandles = [];

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

greenlight.prototype.readyFns = [];

greenlight.prototype.ready = function(f)
{
    this.readyFns.push(f);
};

greenlight.prototype.log = function(format, args)
{
    if(!args)
    {
	args = [];
    }
    
    console.log(vsprintf(format, args));
    
};

greenlight.prototype.reactive_ready = function()
{   
    var isReady = Greenlight.SubscriptionHandles.every(function(handle)
    {
        return handle.ready();
    });

    return isReady;
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
    Greenlight.log("registering " + name + " with version " + version);

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
    Greenlight.ready(this.instantiate_sites);
    Greenlight.ready(this.create_index);

    Deps.autorun(function(){
	if(Greenlight.reactive_ready()){
	    Greenlight.readyFns.every(function(handle){
		handle();
		return true;
	    });
	}
    });
};

greenlight.prototype.create_index = function()
{
    Deps.autorun(function(){
	var users = Meteor.users.find({}).fetch();
	
	for(var i = 0; i < users.length; i++)
	{
	    var user = users[i];
	    var username = user.username;
	    var email = user.emails[0].address;
	    var url = '/users/'+username;
	    var metadata = { icon: "/"+user._id };

	    Greenlight.Search.Index.add([username, email], username, url, 'users', metadata);
	}

	var packages = Greenlight.Packages.find({}).fetch();

	for(var i = 0; i < packages.length; i++)
	{
	    var pkg = packages[i];
	    
	    var name = pkg.name;

	    Greenlight.Search.Index.add([name], name, '/'+name, 'packages');
	}
    });

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
		sites[owned[i]._id] = owned[i];
	    }

	    for(var i = 0; i < user.length; i++)
	    {
		sites[user[i]._id] = user[i];
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

		    Greenlight.Search.Index.add([pkg.name, site.url], pkg.name, '/'+site.url, 'sites');

		    obj.instantiate(s);

		    Session.set("Greenlight:routes-changed", pkg.name);
		  

		}
	    }
	 
	    
	}

    });

};

Greenlight = greenlight.prototype;

Meteor.startup(function(){
    
    Greenlight.init();
 
});

