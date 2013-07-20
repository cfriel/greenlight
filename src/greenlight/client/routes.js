var Router = Backbone.Router.extend({
    
    routes: {
	"" : "main",
	"about" : "about",
	"tour" : "tour",
	"help":	"help",
	"login" : "login",
	"register" : "register",
	"create" : "create",

	"user_information" : "user_information",
	"preview/:site_template": "preview",

	"create/select_collections" : "create_select_collections",
	"create/select_collections/:page": "create_select_collections_index",
	"create/choose_template" : "create_choose_template", 
	"create/choose_template/:page" : "create_choose_template_index", 
	"create/select_url" : "create_select_url",
	"create/add_users" : "create_add_users",

	"create/pending" : "create_pending",
	"create/completed" : "create_completed"
    },

    create_select_url : function()
    {
	Session.set("page", "create_select_url");
    },

    create_select_collections : function()
    {
	this.create_select_collections_index("1");
    },

    create_select_collections_index: function(index)
    {
	Session.set("page", "create_select_collection");
	Session.set("collection_list_page", parseInt(index));
    },

    create_choose_template : function()
    {
	this.create_choose_template_index("1");
    },
        
    create_choose_template_index : function(index)
    {
	Session.set("page", "create_choose_template");
	Session.set("choose_template_page", parseInt(index));
    },

    create : function()
    {
	this.create_choose_template();
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

