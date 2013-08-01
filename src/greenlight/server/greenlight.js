if (Meteor.isServer) {
    Meteor.startup(function () {
	
	

    });
}

greenlight = function(){};

greenlight.prototype = new greenlight();

greenlight.prototype.register_template = function(name, version)
{
    console.log("registering " + name + " with version " + version);
}

Greenlight = greenlight.prototype;