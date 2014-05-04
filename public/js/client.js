/*jslint node: true */
'use strict';
var $ = require('jquery');


var socket;
var canSendMessages = false;
var messageCache = [];
var handlers = {};

function connect(websocketUrl) {
    socket = new WebSocket(websocketUrl);

    socket.onopen = function(e) {
        canSendMessages = true;
        messageCache.forEach(function(message) {
            sendMessage(message);
        });
    };

    socket.onmessage = function(e) {
        var message = JSON.parse(e.data);
        if (message.type in handlers) {
            handlers[message.type](message);
        }
    };
}

function registerHandler(type, handler) {
    handlers[type] = handler;
}

function sendMessage(message) {
    if (!canSendMessages) {
        messageCache.push(message);
    } else {
        socket.send(JSON.stringify(message));
    }
}

function sendChatMessage(text) {
    sendMessage({
        type: 'chat',
        text: text
    });
}


module.exports = {
    connect: connect,
    sendMessage: sendMessage,
    sendChatMessage: sendChatMessage,
    registerHandler: registerHandler,
};
