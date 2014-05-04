(function($) {
    'use strict';

    function Client(clientElem) {
        var self = this;

        this.$root = $(clientElem);
        this.$chat = this.$root.find('.chat');
        this.$chatLog = this.$chat.find('.log');
        this.$chatMessage = this.$chat.find('input[name="message"]');

        this.$chat.submit(function(e) {
            e.preventDefault();
            var message = self.$chatMessage.val();
            self.$chatMessage.val('');
            self.sendChatMessage(message);
        });
    }

    Client.prototype = {
        connect: function connect(websocketUrl) {
            var self = this;

            this.socket = new WebSocket(websocketUrl);

            this.socket.onopen = function(event) {
                self.onopen(event);
            };

            this.socket.onmessage = function(event) {
                self.onmessage(event);
            };
        },

        onopen: function onopen(event) {

        },

        onmessage: function onmessage(event) {
            var $log = $('<p></p>');
            $log.text(event.data);
            this.$chatLog.append($log);
        },

        sendChatMessage: function sendChatMessage(message) {
            this.socket.send(message);
        }
    };


    var client = new Client(document.getElementById('client'));
    client.connect('ws://localhost:3000');
})(jQuery);
