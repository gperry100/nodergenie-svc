var gpio = require('rpi-gpio');
var async = require('async');

//gpio.on('change', function(channel, value) {
//    console.log('Channel ' + channel + ' value is now ' + value);
//});
// 
exports.init = function(callback){
    gpio.destroy();
    console.log('Setting up GPIO mode to ' + gpio.MODE_RPI);
    gpio.setMode(gpio.MODE_RPI);

    async.series([
        function(callback) {
            gpio.setup(11, gpio.DIR_OUT, callback);
        },
        function(callback) {
            gpio.setup(15, gpio.DIR_OUT, callback);
        },
        function(callback) {
            gpio.setup(16, gpio.DIR_OUT, callback);
        },
        function(callback) {
            gpio.setup(13, gpio.DIR_OUT, callback);
        },
        function(callback) {
            gpio.setup(18, gpio.DIR_OUT, callback);
        },
        function(callback) {
            gpio.setup(22, gpio.DIR_OUT, callback);
        },
        function(callback) {
            delayedWrite(22, false, callback);
        },
        function(callback) {
            delayedWrite(18, false, callback);
        },
        function(callback) {
            delayedWrite(11, false, callback);
        },
        function(callback) {
            delayedWrite(15, false, callback);
        },
        function(callback) {
            delayedWrite(16, false, callback);
        },
        function(callback) {
            delayedWrite(13, false, callback);
        },
    ], function(err, results) {
        console.log('Initialised encoder to 0000');
        if(callback) callback();
    });
};

exports.flickSocket = function(switchNum, onOrOff){
    
    console.log("Turn switch " + switchNum + " " + onOrOff);
    
    // Codes for switching on and off the sockets
    // all     1       2       3       4
    var switchMap = {
        "on": ['1011', '1111', '1110', '1101', '1100'],
        "off": ['0011', '0111', '0110', '0101', '0100']
    };

    if(switchNum == "all"){
        switchNum = 0;
    }

    var bitArray = switchMap[onOrOff][switchNum];

    async.series([
        function(callback) {
            console.log('Turning on pin 11');
           
            var state  = bitArray[3] == '1';
            delayedWrite(11, state, callback);
        },
        function(callback) {
            console.log("Turning on pin 15");
            var state  = bitArray[2] == '1';
            delayedWrite(15, state, callback);
        },
        function(callback) {
            console.log('Turning on pin 16');
            var state  = bitArray[1] == '1';
            delayedWrite(16, state, callback);
        },
        function(callback) {
            console.log('Turning on pin 13');
            var state  = bitArray[0] == '1';
            delayedWrite(13, state, callback);
        },
        function(callback) {
            console.log('Wait 100 msec');
            setTimeout(function() {
                callback(null);
            }, 100);
        },
        function(callback) {
            console.log('Turning on pin 22');
            delayedWrite(22, true, callback);
        },
        function(callback) {
            console.log('Wait 250 msec');
            setTimeout(function() {
                callback(null);
            }, 250);
        },
        function(callback) {
            console.log('Turning off pin 22');
            delayedWrite(22, false, callback);
        }
    ], function(err, results) {
        console.log('Writes complete');
        if(err) console.log('Error: ' + err);
        console.log('Results ' + results);
    });


};

exports.destroy = function(){
    shutdown();
};

function delayedWrite(pin, value, callback) {
    setTimeout(function() {
        console.log("Turn pin " + pin + " " + value);
        gpio.write(pin, value, callback);
    }, 500);
}

function shutdown() {
    setTimeout(closePins, 2000);
}

function closePins() {
    gpio.destroy(function() {
        console.log('All pins unexported');
        return process.exit(0);
    });
}