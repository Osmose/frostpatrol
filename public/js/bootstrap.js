/*jslint node: true */
'use strict';
var chat = require('./chat');
var client = require('./client');


client.connect('ws://localhost:3000');
chat.start();
