greenlight.prototype.Entity = function()
{
}

greenlight.prototype.Entity.prototype.from_json = function(json)
{
    var keys = Object.keys(json);

    for(var k in keys)
    {
	this[k] = json[k];
    }
}

greenlight.prototype.Entity.prototype.to_string = function()
{
    JSON.stringify(this);
}