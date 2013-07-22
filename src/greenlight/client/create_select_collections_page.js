Template.create_select_collections_page.events({
    'click #create' : function(e,t)
    {
	Meteor.Router.to('/create/select_url');
    }
});