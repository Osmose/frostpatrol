/*jslint node: true */
'use strict';
var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');


var app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Static media.
var publicPath = path.resolve(path.join(path.dirname(__filename), '..', 'public'));
app.use(express.static(publicPath));


app.get('/', function(req, res){
  res.render('index.html');
});



module.exports = {
    app: app
};
