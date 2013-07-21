Template.site_template_item.events({
    'click .site_template_item' : function(e,t)
    {
	$('.site_template_item').removeClass("selected");
	$(e.target).addClass("selected");
	console.log(t);
    }
});