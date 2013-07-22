Meteor.Router.add({
    "/": "home_page",

    "/create" : function(){
	Session.set("choose_template_page", 1);
	return "create_choose_template_page"
    },

    "/create/select_collections" : function(){
	Session.set("collection_list_page", 1);
	return "create_select_collections_page"
    },
    "/create/select_collections/:page": function(page) {
	Session.set("collection_list_page", parseInt(page));
	return "create_select_collections_page"
    },
    "/create/choose_template" : function(){
	Session.set("choose_template_page", 1);
	return "create_choose_template_page"
    }, 
    "/create/choose_template/:page" : function(page)
    {
	Session.set("choose_template_page", parseInt(page));
	return "create_choose_template_page"
    }, 
    "/create/select_url" : function()
    {
	return "create_select_url_page"
    },
    "/create/add_users" : function(){
	return "create_add_users_page"
    },
    "/create/pending" : function(){
	return "create_pending_page"
    },
    "/create/completed" : function(){
	return "create_completed_page"
    }
    
})