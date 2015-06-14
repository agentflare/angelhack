var http = require('http');
var config = require('./config');
var fs = require('fs');
var request = require('request');
var url = require('url');
var querystring = require('querystring');
var idol_API = require('./idol_API');

var port = 3000;

http.createServer(function(req, res) {
	idol_API.extractFromPhoto(req, res, __dirname + '/samples/words.jpg');
}).listen(port);

console.log("server started at port ", port);