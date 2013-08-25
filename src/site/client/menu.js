var bind_search = function()
{
    Greenlight.log("rebinding search");

    var ta = $('.search.typeahead');
    var users = Greenlight.Search.index('users');
    var sites = Greenlight.Search.index('sites');

    if(users && sites && ta.typeahead)
    {
	ta.typeahead('destroy');

	ta.typeahead([
	{
	    name: 'search-sites-'+new Date().getTime(),
	    local: sites,
	    //remote: '../data/films/queries/%QUERY.json',
	    //prefetch: '../data/films/post_1960.json',
	    template: '<p><strong>{{value}}</strong> – {{url}}</p>',
	    header: '<h3 class="category-name">Sites</h3>',
	    engine: Hogan
	},
	{
	    name: 'search-users'+new Date().getTime(),
	    local: users,
	    //remote: '../data/films/queries/%QUERY.json',
	    //prefetch: '../data/films/post_1960.json',
	    template: '<p><strong>{{value}}</strong> – {{url}}</p>',
	    header: '<h3 class="category-name">Users</h3>',
	    engine: Hogan
	}

	]);

	ta.on("typeahead:selected typeahead:autocompleted", function(e,datum) { 
	    Greenlight.log("Selected %s", [datum]);
	    Meteor.Router.to(datum.url);
	    $(this).val("");
	})
    }
};

Deps.autorun(bind_search);

Template.menu.rendered = function()
{
    bind_search();
};

