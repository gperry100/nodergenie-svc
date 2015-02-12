var express = require('express');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var release = require('./routes/release');
// var huvr = require('./routes/huvr');
//var nodergenie = require('./nodergenie');

var app = express();
var port = process.env.PORT || 3000;

// ## CORS middleware
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.status(202);
		res.send();
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function(req, res) {
  res.json(quotes);
});

app.get('/switches', function(req, res) {
  res.json(quotes);
});

app.post('/switches/:switchNo', function(req, res) {


  res.send("POST /switches/" + req.params.switchNo + " turned " + req.body.onOrOff);
  

});


app.get('/switches/:switchNo/:onOrOff', function(req, res) {

  //nodergenie.flickSocket(switchNo, onOrOff);
  
  // if(quotes.length <= req.params.id || req.params.id < 0) {
  //   res.statusCode = 404;
  //   return res.send('Error 404: No quote found');
  // }  
  // var q = quotes[req.params.id];
  // res.json(q);
  //res.send("GET /switches/:switchNo/:onOrOff");
  res.send("Hello smelliot");
});


//nodergenie.init(function(){
  app.listen(port, function() {
    console.log('SERVER: Listening on port: ' + port);
  });
//});

