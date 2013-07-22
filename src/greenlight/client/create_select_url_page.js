Template.create_select_url_page.events({
    'click #create' : function(e,t)
    {
	Meteor.Router.to('/create/pending');
	Session.set("selected_url", $("#prependedInput").val());
    }
});