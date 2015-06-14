var http = require('http');
var config = require('./config');
var request = require('request');
var url = require('url');
var idol_API = require('./idol_API');
var querystring = require('querystring');
var googlenews = require('./googlenews');

var port = 3000;

http.createServer(function(req, res) {
	var theUrl = url.parse(req.url);
	var queryObj = querystring.parse(theUrl.query);
	var urlData = queryObj.urlData;
	var fileData = queryObj.fileData;
	
	console.log(urlData, fileData);
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Cache-Control', 'no-cache');
	res.writeHead(200, {'Content-Type':'application/json'});
	if(urlData) {
		idol_API.extractFromUrl(req, res, urlData, function(data) {
			console.log(data, typeof data);
			
			googlenews(req, res, data, function(rssOut) {
				//console.log(rssOut);
				var rssOutFiltered=idol_API.filterData(rssOut);
				console.log(rssOutFiltered, typeof rssOutFiltered);
				res.end(rssOutFiltered);
			});
		});
	}
	if(fileData) {
		
		idol_API.extractFromPhoto(req, res, __dirname + "/2587.jpg", function(data) {
			console.log(data, typeof data);
			
			googlenews(req, res, data, function(rssOut) {
				//console.log(rssOut);
				var rssOutFiltered=idol_API.filterData(rssOut);
				console.log(rssOutFiltered, typeof rssOutFiltered);
				res.end(rssOutFiltered);
			});
		});
	}
}).listen(port);

console.log("server started at port ", port);