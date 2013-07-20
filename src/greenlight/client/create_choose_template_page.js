Template.create_choose_template_page.events({
    'click #next' : function(e,t)
    {
	window.location.href = "/create/select_collections";
    }
});

Template.create_choose_template_page.rendered = function(){
    $('#template_container').masonry(
	{ 
	    columnWidth: 220
	}
    );
}

Template.create_choose_template_page.results = function () {
    Pagination.perPage(10);
    Pagination.currentPage(Session.get("choose_template_page"));
    return Pagination.collection(SiteTemplates.find({}).fetch());
}

Template.create_choose_template_page.pagination = function(){
    Pagination.perPage(10);
    Pagination.currentPage(Session.get("choose_template_page"));
    var numRecords = SiteTemplates.find({}).count();

    if(numRecords != 0)
    {
	return Pagination.links("/create/choose_template", numRecords);
    }
}
