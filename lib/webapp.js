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



module.exports = {
    app: app
};
