/*jslint node: true */
'use strict';
var WebSocketServer = require('ws').Server;


function start(httpServer) {
    var server = new WebSocketServer({
        server: httpServer
    });

    server.broadcast = function(data) {
        for (var i in this.clients) {
            this.clients[i].send(data);
        }
    };

    server.on('connection', function(ws) {
        ws.on('message', function(message) {
            console.log('Websocket received: %s', message);
            server.broadcast(message);
        });
    });

    return server;
}


module.exports = {
    start: start
};
