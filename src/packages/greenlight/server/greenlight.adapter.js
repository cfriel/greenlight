greenlight.prototype.Adapter = function(name, description)
{
    this.name = name;
    this.description = description;  
};

greenlight.prototype.Adapter.prototype = new Greenlight.Entity();
greenlight.prototype.Adapter.prototype.constructor = greenlight.prototype.Adapter;

Greenlight.Adapters = new Meteor.Collection("adapters");

Meteor.publish("adapters", function(){
    return Greenlight.Adapters.find();
});

greenlight.prototype.Adapter.prototype.save = function()
{
    var self = this;

    if(!Greenlight.Adapters.findOne({name: this.name}))
    {
	Greenlight.Adapters.insert({ name: this.name, description: this.description });
    }

};


Greenlight.Adapters.allow({

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