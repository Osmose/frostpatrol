/*jslint node: true */
'use strict';
var websocket = require('./websocket');


function start() {
    websocket.registerHandler('chat', handleChatMessage);
}

function handleChatMessage(client, message) {
    console.log('CHAT: ' + message.text);
    message.nickname = client.nickname;
    websocket.broadcastMessage(message);
}


module.exports = {
    start: start
};
