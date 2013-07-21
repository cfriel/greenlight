Template.create_page.events({
    'click #create' : function(e,t)
    {
	app.navigate('/create/select_url', {trigger: true});
    }
});