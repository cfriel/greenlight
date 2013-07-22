DataCollections = new Meteor.Collection("data_collections");

Deps.autorun(function(){
    Meteor.subscribe("data_collections");
});


Template.collection_list.results = function () {
    Pagination.perPage(10);
    Pagination.currentPage(Session.get("collection_list_page"));
    
    return Pagination.collection(DataCollections.find({}).fetch());
}

Template.collection_list.pagination = function(){
    Pagination.perPage(10);
    Pagination.currentPage(Session.get("collection_list_page"));
    var numRecords = DataCollections.find({}).count();

    if(numRecords != 0)
    {
	return Pagination.links("/create/collection", numRecords);
    }
}
