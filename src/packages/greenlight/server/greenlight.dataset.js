greenlight.prototype.Dataset = 
    function(server, database, collection,
	     name, description, schema)
{
    this.server = server;
    this.database = database;
    this.collection = collection;
    this.name = name;
    this.description = description;  
    this.schema = schema;
};

greenlight.prototype.Dataset.prototype = new Greenlight.Entity();
greenlight.prototype.Dataset.prototype.constructor = greenlight.prototype.Dataset;

greenlight.prototype.Dataset.load = function(dataset)
{
    Greenlight.Helpers.load_data(dataset.server,
				 dataset.database,
				 dataset.collection, 
				 {},
				 0, 
				 100);
};

greenlight.prototype.Dataset.watch = function(dataset)
{
    
};

greenlight.prototype.Dataset.prototype.save = function()
{
    var self = this;

    if(!Greenlight.Datasets.findOne({name: this.name}))
    {
	Greenlight.Datasets.insert({ server: this.server, database: this.database, collection: this.collection, name: this.name, description: this.description, schema: this.schema });
    }

};

Greenlight.Datasets = new Meteor.Collection("datasets");

Meteor.publish("datasets", function(){
    return Greenlight.Datasets.find();
});

Greenlight.Datasets.allow({

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

Meteor.methods({

    dataset_load : function(dataset)
    {
	Greenlight.Dataset.load(dataset);
	
	return;
    },
    
    dataset_watch : function(dataset)
    {
	Greenlight.Dataset.watch(dataset);
	
	return;
    }

});