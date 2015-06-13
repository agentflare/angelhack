var http = require('http');
var config = require('./config');
var fs = require('fs');
var request = require('request');
var url = require('url');
var querystring = require('querystring');

var port = 3000;

http.createServer(function(req, res) {
	//getConceptExtraction(req, res, "http://en.wikipedia.org/wiki/United_Kingdom");
	//getConceptExtraction(req, res, "https://en.wikipedia.org/wiki/Snoop_Dogg");
	getOcrDocument(req, res, __dirname + '/words.jpg');
	
}).listen(3000);
console.log("server started at port ", port);

//issues uploading: mmay be file sync
var getOcrDocument = function(req, res, imageFile) {
	
	var testUrl = "https://api.idolondemand.com/1/api/sync/ocrdocument/v1";
	
	var formData = {
		"file": fs.createReadStream(imageFile),
		"apikey": config.idol_APIkey
	};
	
	request
		.post({url: testUrl, formData: formData}, function(err) {
			if(err) { return console.error('upload failed: ', err); }
			else { return console.log("upload success"); }
		})
		.on('response', function(response) {
			console.log(response.statusCode, response.headers['content-type']);
		})
		.on('data', function(chunk) {
			res.write(chunk);
		})
		.on('end', function() {
			console.log("done");
			res.end();
		});
};

//extracts concept from target url, write json to and end response
var getConceptExtraction = function(req, res, targetUrl) {
	console.log("responding to concept extract: ", targetUrl);

	var getUrl = url.format({
		protocol: "https",
		hostname: "api.idolondemand.com",
		pathname: "1/api/sync/extractconcepts/v1",
		search: querystring.stringify({url: targetUrl})
	}).toString() + "&apikey=" + config.idol_APIkey;

	request
		.get(getUrl)
		.on('response', function(response) {
			console.log(response.statusCode, response.headers['content-type']);
		})
		.on('data', function(chunk) {
			res.write(chunk);
		})
		.on('end', function() {
			console.log("done");
			res.end();
		});
};