Template.comments.comments = function()
{
    var url = document.location.pathname;
    var type = "comment";

    var comments = Greenlight.Activities.find({ type: type, url: url});

    return comments;
};

Template.comments.events = {

    'click #create' : function()
    {
	var text = $('#comment').val();
	var owner = Meteor.userId();
	var type = "comment";
	var url = document.location.pathname;

	Greenlight.Activities.insert({ owner: owner, text: text, type: type, url: url });

	$('#comment').val('');

    }

};

Template.comments.username = function()
{
    var self = this;
    var ownerId = self.owner;

    var owner = Meteor.users.findOne({_id: ownerId});
    
    if(owner)
    {
	return owner.username;
    }
};
