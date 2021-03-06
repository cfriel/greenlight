var fs = Npm.require('fs');
var path = Npm.require('path');
var csv = Npm.require('csv');
var module = Npm.require('module');

var __filename = module.uri;
var __dirname = path.dirname(__filename);
var dir = path.resolve(__dirname, "../examples/databases/crunchbase");

var load = function(item)
{

    var mongo = Npm.require('mongodb');
    
    var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    
    var server = new Server('localhost', 27017, {auto_reconnect: true});
    
    var MongoClient = mongo.MongoClient;    
    
    MongoClient.connect('mongodb://127.0.0.1:27017/examples', function(err, db) {
	    
	if(err) throw err;
	
	db.collection(item).count(function(err, result){
	    
	    if(result == 0)
	    {
		csv()
		    .from.path(path.resolve(dir, item + '.csv'), { delimiter: ',', escape: '"', columns: true })
		    .to.array( function(data, count){
	    
			//console.log("read into array " + count + " records");
			
			var people = data;

			var batchSize = 1000;
			
			for(var i = 0; i < people.length / batchSize; i++)
			{
			    var start = i * batchSize;
			    var end = Math.min(people.length-1, (i+1)*batchSize);
			    
			    //console.log("Inserting batch from " + i*batchSize + " to " + end + "...");	   
		
			    db.collection(item).insert(people.slice(i*batchSize, end), {w:1}, function(err, result) {});
			}	
		    })
		    .on('record', function(row,index){
			//console.log('#'+index+' '+JSON.stringify(row));
		    })
		    .on('error', function(error){
			console.log(error.message);
		    });
	    }
	    else
	    {
		console.log(item + " already populated");
	    }
	});
    });	  
};

load("acquisitions");
load("companies");
load("investments");
load("investors");
load("rounds");