PageTemplates = new Meteor.Collection("page_templates");
SiteTemplates = new Meteor.Collection("site_templates");
DataCollections = new Meteor.Collection("data_collections");
UserInformation = new Meteor.Collection("user_information");

if (Meteor.isClient) {


    Template.user_logged_in.events({
	'click #logout' : function(e,t)
	{
	    Meteor.logout();
	}
    });

    Template.login.events({
	
	'submit #login-form' : function(e, t){

	    e.preventDefault();
	    var email = t.find('#login-email').value;
            var password = t.find('#login-password').value;
	    
            Meteor.loginWithPassword(email, password, function(err){
		if (err)
		{
		}
		else
		{
		}
	    });
            return false; 
	}
    });

Template.register.events({
    'submit #register-form' : function(e, t) {
	e.preventDefault();
	var email = t.find('#account-email').value;
	var password = t.find('#account-password').value;

	Accounts.createUser({email: email, password : password}, function(err){
            if (err) {
            } else {
            }
	    
        });
	
	return false;
    }
});
    
    var Router = Backbone.Router.extend({
	
	routes: {
	    "":			"main",
	    "about":"about",
	    "tour":"tour",
	    "help":		"help",
	    "create": "create",
	    "create/collection/:page": "create_collection",
	    "login": "login",
	    "register":"register",
	    "user_information" : "user_information",
	    "preview/:site_template": "preview",
	    "create/pending" : "create_pending",
	    "create/completed" : "create_completed"

	},

	create_completed : function()
	{
	    Session.set("page", "create_completed");
	},

	create_pending : function()
	{
	    Session.set("page", "create_pending");
	},

	user_information: function()
	{
	    Session.set("page", "user_information");
	},

	register: function()
	{
	    Session.set("page", "register");
	},

	login: function()
	{
	    Session.set("page", "login");
	},
	
	create_collection: function(index)
	{
	    Session.set("page", "create");
	    Session.set("collection_list_page", parseInt(index));
	},

	create: function()
	{
	    Session.set("page", "create");
	    Session.set("collection_list_page", 1);
	},

	about: function()
	{
	    Session.set("page", "about");
	},

	tour: function()
	{
	    Session.set("page", "tour");
	},

	preview: function(siteTemplateName)
	{
	    Session.set("page", "preview");
	},

	main: function() {
	    Session.set("page", "home");
	},

	help: function() {
	    Session.set("page", "help");
	}
    });

    var app = new Router;

    Meteor.startup(function(){
	console.log("Setting page to home");
	Session.set("selectedTemplate", "all");
	Backbone.history.start({pushState: true});
    });

    Template.page_template_browser.browsable_templates = function()
    {
	return PageTemplates.find({ tags : { $in : ["all"]}});
    };

    Template.container.page_is = function(page)
    {
	return Session.get("page") == page;
    };

}

