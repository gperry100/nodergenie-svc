var mongo = require('mongodb');
var BSON = mongo.BSONPure;

var baseURL = 'mongodb://utiod2003:27017/';
var theMongoDB = 'LuxuryVOD';

exports.authenticate = function(req,res) {
	
	var theMongoCollection = 'users';
	var authPackage = req.body;	
	console.log('AUTHENTICATE: Auth for ' + authPackage.userID);

	mongo.connect(baseURL + theMongoDB , function(err, db) {
		if(err) {
			console.log('Could not connect to ' + theMongoDB + ' database');
		} else {
			db.collection( theMongoCollection, function(err, coll) {
				if(err) {
					console.log('Could not find the ' + theMongoCollection + ' collection');
				} else {
					coll.findOne( 
						{'userID': authPackage.userID}, 
						function(err, item) {
							if( !err ) {
								if( !item ) {
									//user not found
									res.status(403);
									res.send();
									db.close();
								} else {
									if( item.userPassword == authPackage.userPassword ) {
										//store the item back to update the date
										var savedItem = JSON.parse( JSON.stringify( item ) );
										item.userLastLoginDateTime = Date();
										db.collection(theMongoCollection, function(err, coll2) {
											coll2.update(
												{'_id': item._id}, 
												item, 
												{safe:true}, 
												function(err, result) {
													if (err) {
														res.status(500);
														res.send();
														db.close();
													} else {
														//send back the key
														delete savedItem._id;
														delete savedItem.userPassword;
														res.send(savedItem);
														db.close();
													}
												}
											);
										});
									} else {
										//invalid password
										res.status(401);
										res.send();
										db.close();
									}
								}
							} else {
								//return 500
								res.status(500);
								res.send();
								db.close();
							}
						}
					);
				};
			});
		};		
	});	
};
