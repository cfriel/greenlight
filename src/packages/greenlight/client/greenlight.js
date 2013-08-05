if(Meteor.isClient)
{

    Sites = new Meteor.Collection("sites");
    SiteTemplates = new Meteor.Collection("site_templates");

    Deps.autorun(function(){
	Meteor.subscribe("site_templates");
	Meteor.subscribe("sites");
    });

    Meteor.startup(function(){
	
    });

    greenlight = function(){};

    greenlight.prototype = new greenlight();

    greenlight.prototype.register_site = function(site, callback)
    {
	Meteor.call('register_site', site, function(err, res){
	    callback(err, res);
	});
    }

    greenlight.prototype.register_template = function(name, version, template)
    {
	console.log("registering " + name + " with version " + version);

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


			var sites = Sites.find
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
			}
			
			Meteor.Router.add(t.routes);
		    }
		}
	    });
	};

	f(name,version,template);
    }

    Greenlight = greenlight.prototype;

}