if(Meteor.isServer)
{

Meteor.startup(function () {
        
});

greenlight = function(){};

greenlight.prototype = new greenlight();

greenlight.prototype.register_template = function(name, version, template)
{
    console.log("registering " + name + " with version " + version);

    if(!SiteTemplates.findOne( { name: name, version: version }))
    {
	SiteTemplates.insert( { name : name, version : version } );
    }
    
    // var f = function(n, v, t)
    // {
    // 	console.log("calling f");

    // 	Deps.autorun(function(){
	    
    // 	    console.log("deps autorun");
	    
    // 	    if(t.routes)
    // 	    {
    // 		console.log("have routes " + t.routes);
		
    // 		var siteTemplate = SiteTemplates.findOne( { name: n, version: v});
		
    // 		if(siteTemplate)
    // 		{
    // 		    console.log("have site template " + siteTemplate);

    // 		    var templateId = siteTemplate._id;

    // 		    var sites = Sites.find({template : templateId}).fetch();
		    
    // 		    var keys = Object.keys(t.routes);

    // 		    console.log("have sites " + sites + " and keys " + keys);
		    
    // 		    for(var s = 0; s < sites.length; s++)
    // 		    {
    // 			var site = sites[s];

    // 			console.log("have site " + site);

    // 			for(var i = 0; i < keys.length; i++)
    // 			{
    // 			    var key = keys[i];
    // 			    var route = t.routes[key];
    // 			    var path = '/' + site.url + key;
			    
    // 			    console.log("Registering " + siteTemplate.name + " at " + path);

    // 			    t.routes[path]=route;
    // 			}
    // 		    }
		    
    // 		    Meteor.Router.add(t.routes);
    // 		}
    // 	    }
    // 	});
    // };

    // f(name,version,template);

}

greenlight.prototype.get_templates = function()
{
    return SiteTemplates.find();
}

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
}

Greenlight = greenlight.prototype;


Meteor.methods({

    register_site : function(site)
    {
	return Greenlight.register_site(site);
    }

});

}