var mongo = Npm.require('mongodb');
var ObjectID = Npm.require('mongodb').ObjectID;
var Binary = Npm.require('mongodb').Binary;
var Fiber = Npm.require('fibers');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
var MongoClient = mongo.MongoClient;    

helpers = function()
{
};

helpers.prototype.load_schema = 
    function(server, database, collection)
{

    Greenlight.log("loading schema %s, %s, %s", [server, database, collection]);

    // fixme this ignores the server
    var db = Databases.findOne({ name: database });

    if(!db)
    {
	Greenlight.Helpers.load_databases(server);

	db = Databases.findOne({ name: database });

	if(!db)
	{
	    Greenlight.log("no such database %s, %s, %s", [server, database, collection]);
	    
	    return;
	}
    }

    var collections = db.collections;
    
    var found = false;
    
    for(var i = 0; i < collections.length; i++)
    {
	if(collections[i].name == collection && collections[i].schema)
	{
	    found = true;
	    break;
	}
    }

    if(found)
    {
	Greenlight.log("found schema for %s, %s, %s", [server, database, collection]);

	return;
    }
    else
    {
	var schema = this.analyze_schema(server, database, collection);
	
	var collections = db.collections;
	
	if(collections)
	{
	    for(var i = 0; i < collections.length; i++)
	    {
		if(collections[i].name == collection)
		{
		    collections[i].schema = schema;
		    
		    Databases.update({_id: db._id}, db);

		    return;
		}
	    }   
	}	
    }
    
};

helpers.prototype.load_and_analyze_databases = function(server)
{
    Greenlight.log("loading and analyzing databases %s", [server]);

    var databases = Databases.find().fetch();

    if(databases.length == 0)
    {
	this.load_databases(server);

	databases = Databases.find().fetch();
    }

    for(var i = 0; i < databases.length; i++)
    {
	var database = databases[i];

	Greenlight.log("considering database %s", [database]);

	if(database && database.collections)
	{
	    var collections = database.collections;

	    for(var j = 0; j < collections.length; j++)
	    {
		var collection = collections[j];

		this.load_schema(server, database.name, collection.name);
		
		(function(){
		    var _server = server;
		    var _database = database.name;
		    var _collection = collection.name;
		    var _name = _database + "." + _collection +  " full collection";
		    var _description = "default full collection (autodiscovered)";
		    
		    var dataset = new Greenlight.Dataset(_server, _database, _collection, _name, _description);
		    
		    dataset.save();
		}());
	    }
	}
    }    

};

helpers.prototype.load_databases = 
    function(server)
{
    Greenlight.log("loading databases %s", [server]);

    Fiber(function(params){

	var server = params[0];
	
	MongoClient.connect(server, function(err, db) {
	    
	    if(err) 
	    {
		throw err;
	    }
	    
	    db.executeDbCommand({'listDatabases':1}, function(err, doc) { 
	    
		var databases = doc.documents[0].databases;
		
		for(var i = 0; i < databases.length; i++){
		    
		    var database = databases[i];
		    
		    Fiber(function(params){

			var database = params[0];

			var collections = Meteor.sync(function(done){

			    MongoClient.connect(server + database.name, function(err, child) {
			    
				if(err) 
				{
				    throw err;
				}
				
				child.collectionNames(function(err, collections){			    
				    done(err,collections);
				});
			    });
			});
		    
			database.collections = collections.result;
			
			for(var j = 0; j < database.collections.length; j++)
			{
			    var name = database.collections[j].name;
			    var splits = name.split('.');
			    
			    var databaseName = splits[0];
			    var collectionName = splits[1];
			    
			    database.collections[j].database = databaseName;
			    database.collections[j].name = collectionName;
			}
			
			if(!Databases.findOne({ name : database.name }))
			{
			    Databases.insert(database);
			}
		    }).run([database]);
		}
	    });
	});
    }).run([server]);
};

helpers.prototype.load_data = 
    function(server, database, collection, query, start, count)
{
    Greenlight.log("loading data %s, %s, %s, %s, %s", 
		   [server, database, collection, query, start, count]);
    
    Fiber(function(params){

	var server = params[0];
	var database = params[1];
	var collection = params[2];
	var query = params[3];
	var start = params[4];
	var count = params[5];
	    
	var res = Meteor.sync(function(done){
	    MongoClient.connect(

		server+database, function(err, db) 
		{
		
		    if(err) 
		    {
			throw err;
		    }
		
		    db.collection(collection)
		    .find(query)
		    .limit(count)
		    .toArray(function(err, docs) {
			done(err, docs);
		    });
		});
	});
	
	if(res.error)
	{
	    Greenlight.log("failed to data: %s", res.error);
	}
	else
	{
	    for(var i = 0; i < res.result.length; i++)
	    {
		res.result[i]._id = "" + res.result[i]._id;
		res.result[i]._collection = collection;
		
		if(!Data.findOne({_id : res.result[i]._id}))
		{
		    Data.insert(res.result[i]);
		}
	    }
	}
    }).run([server, database, collection, query, start, count]);
    
    return;
};

helpers.prototype.load_item = 
    function(server, database, collection, id)
{
    Greenlight.log("loading item %s, %s, %s, %s", 
		   [server, database, collection, id]);

    Fiber(function(params){

	var server = params[0];
	var database = params[1];
	var collection = params[2];
	var id = params[3];
	
	var res = Meteor.sync(function(done){

	    MongoClient.connect(server+database, function(err, db) {

		if(err)
		{
		    throw err;
		}
		
		db.collection(collection)
		    .find({_id : id})
		    .toArray(function(err, docs) {
			done(err, docs);
		    });
	    });
	});
	
	if(res.error)
	{
	    Greenlight.log("failed to load item: %s", res.error);
	}
	else
	{
	    Greenlight.log("loaded item: %s", res.result);
	    
	    for(var i = 0; i < res.result.length; i++)
	    {
		res.result[i]._id = "" + res.result[i]._id;
		res.result[i]._collection = collection;
		
		if(!Data.findOne({_id : res.result[i]._id}))
		{
		    Data.insert(res.result[i]);
		}
	    }
	}
    }).run([server, database, collection, id]);
    
    return;    
};

helpers.prototype.analyze_schema = function(server, database, collection)
{
    Greenlight.log("Analyzing schema %s, %s, %s", [server, database, collection]);

    if (typeof limit === "undefined") 
    { 
	var limit = 10000; 
    }
    
    if (typeof maxDepth === "undefined") 
    { 
	var maxDepth = 99; 
    }
    
    varietyCanHaveChildren = function (v) 
    {
	var isArray = v && 
            typeof v === 'object' && 
            typeof v.length === 'number' && 
            !(v.propertyIsEnumerable('length'));
	var isObject = typeof v === 'object';
	var specialObject = v instanceof Date || 
            v instanceof ObjectID ||
            v instanceof Binary;
	return !specialObject && (isArray || isObject);
    }
    
    varietyTypeOf = function(thing) 
    {
	if (typeof thing === "undefined") 
	{ 
	    throw "varietyTypeOf() requires an argument"; 
	}
	
	if (typeof thing !== "object") 
	{  
	    return (typeof thing)[0].toUpperCase() + (typeof thing).slice(1);
	}
	else 
	{
	    if (thing && thing.constructor === Array) 
	    { 
		return "Array";
	    }
	    else if (thing === null) 
	    {
		return "null";
	    }
	    else if (thing instanceof Date) 
	    {
		return "Date";
	    }
	    else if (thing instanceof ObjectID) 
	    {
		return "ObjectID";
	    }
	    else if (thing instanceof Binary) 
	    {
		var binDataTypes = {};
		binDataTypes[0x00] = "generic";
		binDataTypes[0x01] = "function";
		binDataTypes[0x02] = "old";
		binDataTypes[0x03] = "UUID";
		binDataTypes[0x05] = "MD5";
		binDataTypes[0x80] = "user";
		return "BinData-" + binDataTypes[thing.subtype()];
	    }
	    else 
	    {
		return "Object";
	    }
	}
    }
    
    var addTypeToArray = function(arr, value) 
    {
	var t = varietyTypeOf(value);
	var found = false;
	for(var i=0; i< arr.length; i++) 
	{
	    if(arr[i] == t) 
	    {
		found = true;
		break;
	    }
	}
	if(!found) 
	{
	    arr.push(t);
	}
    }
    
    var addRecordResult = function(key, value, result) 
    {
	cur = result[key];
	if(cur == null) 
	{
	    result[key] = {"_id":{"key":key},"value": {"type": varietyTypeOf(value)}, totalOccurrences:1};
	} 
	else 
	{
	    var type = varietyTypeOf(value);
	    if(cur.value.type != type) 
	    {
		cur.value.types = [cur.value.type];
		delete cur.value["type"];
		addTypeToArray(cur.value.types, type);
	    } 
	    else if(!cur.value.type) 
	    {
		addTypeToArray(cur.value.types, type);
	    }
	    
	    result[key] = cur;
	}
    }
    
    var mapRecursive = function(parentKey, obj, level, result) 
    {
	for (var key in obj) 
	{
	    if(obj.hasOwnProperty(key)) 
	    {
		var value = obj[key];
		key = (parentKey + "." + key).replace(/\.\d+/g,'.XX');
		addRecordResult(key, value, result);
		if (level < maxDepth - 1 && varietyCanHaveChildren(value)) 
		{
		    mapRecursive(key, value, level + 1, result);
		}
	    }
	}
    }
    
    var varietyResults = {};
    var numDocuments = 0;

    var addVarietyResults = function(result) 
    {
	for(var key in result) 
	{
	    if(result.hasOwnProperty(key)) 
	    {
		cur = varietyResults[key];
		var value = result[key];
		if(cur == null) 
		{
		    varietyResults[key] = value;
		} 
		else 
		{
		    if(value.type && value.type == cur.value.type) 
		    {
			
		    } 
		    else 
		    {
			for(type in value.types) 
			{
			    if(cur.value.type != type) 
			    {
				cur.value.types = [cur.value.type];
				delete cur.value["type"];
				addTypeToArray(cur.value.types, type);
			    } 
			    else if(!cur.value.type) 
			    {
				addTypeToArray(cur.value.types, type);
			    }
			}
		    }
		    cur.totalOccurrences++;
		    varietyResults[key] = cur;
		}
	    }
	}
    }
    
    var res = Meteor.sync(function(done){

	MongoClient.connect(server+database, function(err, db) {
	    
	    // main cursor
	    db.collection(collection).find().limit(limit).each(function(err,obj) {

		if(obj == null)
		{
		    done(err, varietyResults);
		}
		var recordResult = {};
		numDocuments++;
		for (var key in obj) {
		    if(obj.hasOwnProperty(key)) {
			var value = obj[key];
			addRecordResult(key, value, recordResult);
			if (maxDepth > 1 && varietyCanHaveChildren(value)) {
			    mapRecursive(key, value, 1, recordResult);
			}
		    }
		}

		addVarietyResults(recordResult);
	    });
	});
    });


    if(res.error)
    {
	Greenlight.log("Failed to analyze schema", []);
    }
    else
    {
	var fields = res.result;
	
	for(var key in fields)
	{
	    fields[key].ratio = fields[key].totalOccurrences / numDocuments;
	}
	
	return res.result;
    }
    
};


greenlight.prototype.Helpers = new helpers();
