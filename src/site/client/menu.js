var bind_search = function()
{
    Greenlight.log("rebinding search");

    var ta = $('.search.typeahead');
    var users = Greenlight.Search.index('users');
    var sites = Greenlight.Search.index('sites');
    var packages = Greenlight.Search.index('packages');

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
	    template: '<p><img src="{{metadata.icon}}" onerror="this.onerror=null;this.src=\'/default-user.jpg\'" class="search-icon-small"/><strong>{{value}}</strong> – {{url}}</p>',
	    header: '<h3 class="category-name">Users</h3>',
	    engine: Hogan
	},
	{
	    name: 'search-packages'+new Date().getTime(),
	    local: packages,
	    //remote: '../data/films/queries/%QUERY.json',
	    //prefetch: '../data/films/post_1960.json',
	    template: '<p><strong>{{value}}</strong> – {{url}}</p>',
	    header: '<h3 class="category-name">Packages</h3>',
	    engine: Hogan
	},
	{
	    name: 'search-elastic'+new Date().getTime(),
	    //local: packages,
	    remote: {
                url: '/autocomplete/%QUERY',
                beforeSend: function(jqXhr, settings) {
                    jqXhr.setRequestHeader('token', "123456");
		},
		filter: function(resp, status, jqXhr) {
                    var newResp = [];
		    var hits = resp;

		    if(hits)
		    {
			for (var i=0; i < hits.length; i++) 
			{
			    hits[i].text = hits[i];
			    newResp.push(hits[i]);
			}
		    }
                    return newResp;
		}
            },
            limit: 5,
	    //prefetch: '../data/films/post_1960.json',
	    template: '<p><strong>{{value}}</strong> – {{url}}</p>',
	    header: '<h3 class="category-name">Other</h3>',
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

