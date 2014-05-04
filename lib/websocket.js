/*jslint node: true */
'use strict';
var WebSocketServer = require('ws').Server;


var server;
var handlers = {};

function start(httpServer) {
    server = new WebSocketServer({
        server: httpServer
    });

    server.on('connection', function(client) {
        client.on('message', function(message) {
            message = JSON.parse(message);
            if (message.type in handlers) {
                handlers[message.type](client, message);
            } else {
                console.log('UNKNOWN: %s', message.toSource());
            }
        });

        // Assign new users a nickname.
        client.nickname = generateNickname();
        sendMessage(client, {type: 'core', command: 'nick', nickname: client.nickname});
    });

    return server;
}

function broadcastMessage(message) {
    for (var i in server.clients) {
        sendMessage(server.clients[i], message);
    }
}

function sendMessage(client, message) {
    message = JSON.stringify(message);
    client.send(message);
}

function registerHandler(type, handler) {
    handlers[type] = handler;
}

function generateNickname() {
    return 'anon' + Math.ceil(Math.random() * 10000);
}


module.exports = {
    start: start,
    broadcastMessage: broadcastMessage,
    sendMessage: sendMessage,
    registerHandler: registerHandler
};
