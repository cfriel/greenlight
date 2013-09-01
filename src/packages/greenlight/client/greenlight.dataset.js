/**
 *
 * The dataset class encapsulates a group of data
 * for the purposes of synchronizing it with the 
 * client local database.  Since it doesn't make sense
 * to transfer the entire database, or on occasion
 * users will only have interest in a pre-filtered set
 * of results from a database, or the result of a feed,
 * the dataset is meant to manage the process of 
 * keeping the local datastore synchronized with the data
 * store on the server.
 */
greenlight.prototype.Dataset = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

    // this.name = null;
    // this.owner = null;
    // this.description = null;
    // this.data = null;
    // this.created = null;
    // this.modified = null;
    // this.entitlements = null;
    // this.database = null;
    // this.collection = null;
    // this.query = null;
};

Data = new Meteor.Collection("data");

Meteor.startup(function(){
});

Greenlight.Datasets = new Meteor.Collection("datasets");

Greenlight.SubscriptionHandles.push(Meteor.subscribe("data"));
Greenlight.SubscriptionHandles.push(Meteor.subscribe("datasets"));

greenlight.prototype.Dataset.prototype = new Greenlight.Entity();
greenlight.prototype.Dataset.prototype.constructor = greenlight.prototype.Dataset;
Greenlight.Datasets.entity = greenlight.prototype.Dataset;

greenlight.prototype.Dataset.findOne = function(query)
{
    return Greenlight.Datasets.findOne(query);
}

greenlight.prototype.Dataset.find = function(query)
{
    return Greenlight.Datasets.find(query);
};

greenlight.prototype.Dataset.load = function(dataset)
{
    if(!dataset.count)
    {
	dataset.count = 1000;
    }

    Meteor.call('dataset_load', dataset);
};

greenlight.prototype.Dataset.prototype.create = function()
{
};

greenlight.prototype.Dataset.prototype.destroy = function()
{
};

greenlight.prototype.Dataset.prototype.watch = function()
{
    Meteor.call('dataset_watch', this);
};
