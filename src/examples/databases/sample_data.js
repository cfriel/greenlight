var SampleData = function()
{
    this._databaseName = "examples";

    this.setup = function()
    {
	var self = this;
	
	console.log(self);
	
	var mongo = Npm.require('mongodb');
	
	var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;
	
	var MongoClient = mongo.MongoClient;    
	
	var databaseFound = false;
	
	MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, db) {
	    if(err) throw err;
	    
	    db.executeDbCommand({'listDatabases':1}, function(err, doc) { 
		
		var databases = doc.documents[0].databases;
		
		for(var i = 0; i < databases.length; i++)
		{
		    console.log(databases[i]);
		    
		    if(databases[i].name == self._databaseName)
		    {
			databaseFound = true;
		    }
		}
		
		if(databaseFound)
		{
		    console.log(self._databaseName + " exists");
		}
		else
		{
		    console.log(self._databaseName + " doesn't exist");
		}
		
	    });
	    
	});	
    }
      
    return this;
};

SampleData = new SampleData();

SampleData.setup();