var mongo = require('mongodb').MongoClient;

var baseURL = 'mongodb://utiod2003:27017/';
var theMongoDB = 'LuxuryVOD';

function writeProvider(stuff,callback) {
	
	var theMongoCollection = 'collection';

	mongo.connect(baseURL + theMongoDB , function(err, db) {
		if(err) {
			console.log('Could not connect to ' + theMongoDB + ' database');
			console.log(err);
		} else {
			db.collection( theMongoCollection, function(err, coll) {
				if(err) {
					console.log('Could not find the ' + theMongoCollection + ' collection');
					console.log(err);
				} else {
					// Do business here ... and remember to send a response and close the DB
					console.log('DO SOMETHING MONGOEY');
					res.header("Access-Control-Allow-Origin", "*");
					res.send(savedItem);					
					db.close();
				};
			});
		};		
	});	
};
