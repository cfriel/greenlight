greenlight.prototype.Endpoint = function(name, adapter, configuration)
{
    this.name = name;
    this.adapter = adapter;
    this.configuration = configuration;
};

greenlight.prototype.Endpoint.prototype = new Greenlight.Entity();
greenlight.prototype.Endpoint.prototype.constructor = greenlight.prototype.Endpoint;

Greenlight.Endpoints = new Meteor.Collection("endpoints");

Meteor.publish("endpoints", function(){
    return Greenlight.Endpoints.find();
});

greenlight.prototype.Endpoint.prototype.save = function()
{
    var self = this;

    if(!Greenlight.Endpoints.findOne({name: self.name}))
    {
	Greenlight.Endpoints.insert({ name: self.name, adapter: self.adapter, configuration: self.configuration, owner:  Meteor.userId()});
    }

};

Greenlight.Endpoints.allow({

    insert: function (userId, doc) {
	
	return (userId && doc.owner === userId);
    },

    update: function (userId, doc, fields, modifier) {
	
	return doc.owner === userId;
    },

    remove: function (userId, doc) {
	
	return doc.owner === userId;
    },

    fetch: ['owner']    
});