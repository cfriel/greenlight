PageTemplates = new Meteor.Collection("page_templates");
SiteTemplates = new Meteor.Collection("site_templates");

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
	    // retrieve the input field values
	    var email = t.find('#login-email').value
            , password = t.find('#login-password').value;
	    
            // Trim and validate your fields here.... 
	    
            // If validation passes, supply the appropriate fields to the
            // Meteor.loginWithPassword() function.
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
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
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
	    "login": "login",
	    "register":"register",
	    "preview/:site_template": "preview"
	},


	register: function()
	{
	    Session.set("page", "register");
	},

	login: function()
	{
	    Session.set("page", "login");
	},

	create: function()
	{
	    Session.set("page", "create");
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

