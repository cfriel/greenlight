Template.site_template_item.events({
    'click .site_template_item' : function(e,t)
    {
	$(e.target).addClass("selected");
	console.log(t);
    }
});