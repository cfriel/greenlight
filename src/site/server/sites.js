Sites = new Meteor.Collection("sites");

Meteor.startup(function(){
   
    Meteor.publish("sites", function(){
	return Sites.find();
    });

    Sites.allow({
	insert: function (userId, doc) {
	    // the user must be logged in, and the document must be owned by the user
	    return (userId && doc.owner === userId);
	},
	update: function (userId, doc, fields, modifier) {
	    // can only change your own documents
    return doc.owner === userId;
	},
	remove: function (userId, doc) {
	    // can only remove your own documents
	    return doc.owner === userId;
	},
	fetch: ['owner']    
    });
});