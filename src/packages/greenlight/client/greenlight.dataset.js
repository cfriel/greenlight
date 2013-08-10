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
greenlight.prototype.Dataset = function()
{
    this.name = null;
    this.owner = null;
    this.description = null;
    this.data = null;
    this.created = null;
    this.modified = null;
    this.entitlements = null;
    this.database = null;
    this.collection = null;
    this.query = null;
};

greenlight.prototype.Dataset.Datasets = new Meteor.Collection("datasets");

Deps.autorun(function(){
    Meteor.subscribe("datasets");
});

greenlight.prototype.Dataset.prototype.create = function()
{
};

greenlight.prototype.Dataset.prototype.destroy = function()
{
};

greenlight.prototype.Dataset.prototype.watch = function()
{
};
