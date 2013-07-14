Template.collection_list_item.events({
 
    'click .select-box' : function(e,t)
    {
	$(e.target).parent().parent().addClass("selected");
	console.log(t);
    }
});