/*jslint node: true */
'use strict';
var http = require('http');

var chat = require('./chat');
var webapp = require('./webapp');
var websocket = require('./websocket');


function FrostPatrol() {
    this.server = http.createServer(webapp.app);
    this.websocketServer = websocket.start(this.server);

    // Initialize services.
    chat.start();
}

FrostPatrol.prototype = {
    start: function() {
        this.server.listen(3000, function() {
            console.log('Listening on port %d', this.address().port);
        });
    }
};


module.exports = {
    FrostPatrol: FrostPatrol
};
