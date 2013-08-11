greenlight.prototype.Entity = function()
{
};

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
};

greenlight.prototype.Entity.prototype.init = function(obj)
{
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    for (var key in obj) {
        this[key] = cloneObject(obj[key]);
    }
};

greenlight.prototype.Entity.prototype.from_json = function(json)
{
    var keys = Object.keys(json);

    for(var k in keys)
    {
	this[k] = json[k];
    }
};

greenlight.prototype.Entity.prototype.to_string = function()
{
    JSON.stringify(this);
};