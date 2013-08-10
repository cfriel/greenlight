greenlight.prototype.Process = function()
{
};

greenlight.prototype.Process.prototype = new Greenlight.Entity();
greenlight.prototype.Process.prototype.constructor = greenlight.prototype.Process;

Processes = new Meteor.Collection("processes");

Meteor.publish("processes", function(){
    return Processes.find();
});

Processes.allow({

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
