 greenlight.prototype.Search = 
    function()
{
};

greenlight.prototype.Search.prototype = new Greenlight.Entity();
greenlight.prototype.Search.prototype.constructor = greenlight.prototype.Search;

Greenlight.Search.Index = new Meteor.Collection("search_index");

Meteor.publish("search_index", function(){
    return Greenlight.Search.Index.find();
});

Greenlight.Search.Index.allow({

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
