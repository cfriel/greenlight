greenlight.prototype.Dataset = 
    function(server, database, collection,
	     name, description)
{
    this.server = server;
    this.database = database;
    this.collection = collection;
    this.name = name;
    this.description = description;
    
};

greenlight.prototype.Dataset.prototype = new Greenlight.Entity();

greenlight.prototype.Dataset.prototype.save = function()
{
    var self = this;

    Datasets.insert({ server: this.server, database: this.database, collection: this.collection, name: this.name, description: this.description });

};

Datasets = new Meteor.Collection("datasets");

Meteor.publish("datasets", function(){
    return Datasets.find();
});

Datasets.allow({

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
