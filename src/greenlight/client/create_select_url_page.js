Template.create_select_url_page.events({
    'click #create' : function(e,t)
    {
	app.navigate('create/pending', {trigger: true});
	Session.set("selected_url", $("#prependedInput").val());
    }
});