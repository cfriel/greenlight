var bind_search = function()
{
    Greenlight.log("rebinding search");

    var ta = $('.search.typeahead');
    var index = Greenlight.Search.index();

    if(index && ta.typeahead)
    {
	ta.typeahead('destroy');

	ta.typeahead([
	{
	    name: 'search-'+new Date().getTime(),
	    local: index,
	    //remote: '../data/films/queries/%QUERY.json',
	    //prefetch: '../data/films/post_1960.json',
	    template: '<p><strong>{{value}}</strong> – {{url}}</p>',
	    engine: Hogan
	}
	]);
    }
};

Deps.autorun(bind_search);

Template.menu.rendered = function()
{
    bind_search();
};

