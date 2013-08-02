Template.user_logged_in.events({
    'click #logout' : function(e,t)
    {
	Meteor.logout();
	}
});
