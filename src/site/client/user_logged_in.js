Template.user_logged_in.events({
    'click #logout' : function(e,t)
    {
	Meteor.logout();
    }
});

Template.user_logged_in.userId = function()
{
    return Meteor.userId();
}