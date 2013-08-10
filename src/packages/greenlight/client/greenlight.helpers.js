helpers = function()
{
};

helpers.prototype.create_slickgrid = function(container, data, columns)
{
    var options = {
	enableCellNavigation: true,
	enableColumnReorder: false,
	rowHeight: 30,
	editable: false,
	autoEdit: true,
	forceFitColumns: true
    };
    

    grid = new Slick.Grid(container, data, columns, options);
    
    grid.onSort.subscribe(function(e, args){
	
	var field = args.sortCol.field;
	
	data.sort(function(a, b){
	    var result = 
		a[field] > b[field] ? 1 :
		a[field] < b[field] ? -1 :
		0;
	    
	    return args.sortAsc ? result : -result;
	});
	    
	grid.invalidate();         
    });
    
    grid.setSelectionModel(new Slick.CellSelectionModel()); 

    $(container).height($(window).height() - 70);

    $(window).resize(function() {
	$(container).height($(window).height() - 70);
	$(".slick-viewport").height($(container).height() - 35);
    });


    return grid;
    
};

greenlight.prototype.Helpers = new helpers();