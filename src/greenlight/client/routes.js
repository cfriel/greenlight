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