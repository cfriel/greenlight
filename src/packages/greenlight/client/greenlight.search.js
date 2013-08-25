 /**
 *
 * The search class encapsulates the global search 
 * functionality.  It packages the index with the
 * support for local to remote typeahead.
 */
greenlight.prototype.Search = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }

};

Greenlight.Search.Index = new Meteor.Collection("search_index");

Deps.autorun(function(){
    Meteor.subscribe("search_index");
});

greenlight.prototype.Search.prototype = new Greenlight.Entity();
greenlight.prototype.Search.prototype.constructor = greenlight.prototype.Search;
Greenlight.Datasets.entity = greenlight.prototype.Search;

greenlight.prototype.Search.index = function(category)
{
    var react = Session.get("Greenlight:index-updated");

    if(react)
    {
	return Greenlight.Search.Index.find({category:category}).fetch();
    }
};

greenlight.prototype.Search.Index.add = function(tokens, value, url, category, metadata)
{
    if(!Greenlight.Search.Index.findOne({value: value, url: url, tokens: tokens, owner: Meteor.userId(), category: category}))
    {
	Greenlight.log("Updating index with %s, %s, %s, %s, %s", [tokens, value, url, category, metadata]);
	Greenlight.Search.Index.insert({ value: value, url: url, tokens: tokens, owner: Meteor.userId(), category: category, metadata: metadata });
	Session.set("Greenlight:index-updated", new Date().getTime());
    }
};