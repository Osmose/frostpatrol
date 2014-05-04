/*jslint node: true */
'use strict';
var $ = require('jquery');
var client = require('./client');


function start() {
    var $chat = $('#chat');
    var $chatLog = $chat.find('.log');
    var $chatMessage = $chat.find('input[name="message"]');

    $chat.submit(function(e) {
        e.preventDefault();
        var message = $chatMessage.val();
        $chatMessage.val('');
        client.sendChatMessage(message);
    });

    client.registerHandler('chat', function(data) {
        var $newMsg = $('<p></p>');
        $newMsg.text(data.text);
        $chatLog.append($newMsg);
    });
}


module.exports = {
    start: start
};
