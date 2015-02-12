//var mongo = require('mongodb').MongoClient;


function availResponse(user,type,numRecs) {

	this.userID = user;
	this.resultType = type;
	this.resultRecords = numRecs;
	
};

exports.availSearch = function(req,res) {

	var availFrom = req.body.availFrom;
	var availTo = req.body.availTo;
	var isReleased = req.body.released;
	var userID = req.body.userID;

	var reply = new availResponse(userID, 'release.availability', 50);

	res.status(202);
	res.send(reply);	

console.log("Search.");

};

exports.availResults = function(req,res) {

	// var userID = req.query.userID;
	// var resultType = 'release.availability';
	// var recordFrom = req.query.pageFrom;
	// var recordTo = req.query.pageTo;
	
	// var theMongoCollection = 'results';

	// mongo.connect(baseURL + theMongoDB , function(err, db) {
	// 	if(err) {
	// 		console.log('Could not connect to ' + theMongoDB + ' database');
	// 		console.log(err);
	// 	} else {
	// 		db.collection( theMongoCollection, function(err, coll) {
	// 			if(err) {
	// 				console.log('Could not find the ' + theMongoCollection + ' collection');
	// 				console.log(err);
	// 			} else {
	// 				// Do business here ... and remember to send a response and close the DB
	// 				coll.findOne( 
	// 					{'resultFor': userID, 'resultType': resultType}, 
	// 					function(err, item) {
	// 						var reply;
	// 						if(err) {
	// 							res.status(500);
	// 							reply = err;
	// 						} else {
	// 							if( item ) {
	// 								delete item._id;
	// 								item.resultGenerated = Date();
	// 								res.status(200);
	// 							} else {
	// 								res.status(404);
	// 							}
	// 							reply = item;
	// 						}
	// 						res.send(reply);
	// 						db.close();
	
	// 						console.log("Result.");
	// 					}
	// 				);
	// 			};
	// 		});
	// 	};		
	// });	
};