/*jslint node: true */
'use strict';
var WebSocketServer = require('ws').Server;


function start(httpServer) {
    var server = new WebSocketServer({
        server: httpServer
    });

    server.broadcast = function(data) {
        data = JSON.stringify(data);
        for (var i in this.clients) {
            this.clients[i].send(data);
        }
    };

    server.on('connection', function(ws) {
        ws.on('message', function(message) {
            message = JSON.parse(message);

            if (message.type == 'chat') {
                console.log('CHAT: %s', message.text);
                server.broadcast(message);
            } else {
                console.log('UNKNOWN: %s', message.type);
            }
        });
    });

    return server;
}


module.exports = {
    start: start
};
