/*jslint node: true */
'use strict';

var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res){
  res.render('index.html');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
