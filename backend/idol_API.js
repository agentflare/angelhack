var fs = require('fs');
var config = require('./config');
var request = require('request');

var apiRespond = function(apiRequest, res) {
	apiRequest
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

//issues uploading: may be file sync
var getOcrDocument = function(req, res, imageFile) {
	console.log("responding to document ", imageFile);
	
	var getUrl = config.idol_APIurl("ocrdocument");
	console.log("POST: ", getUrl)
	
	var formData = {
		"file": fs.createReadStream(imageFile),
		"apikey": config.idol_APIkey
	};
	
	apiRespond(
		request.post(
			{url: getUrl, formData: formData},
			function(err) {
				if(err) { return console.error('upload failed: ', err); }
				else { return console.log("upload success"); }
			}
		)
	, res);
};

//extracts concept from target url, write json to and end response
var getConceptExtraction = function(req, res, targetUrl) {
	console.log("responding to concept extract: ", targetUrl);

	var getUrl = config.idol_APIurl("extractconcepts", targetUrl);
	console.log("GET: ", getUrl);
	apiRespond(request.get(getUrl), res);
};

module.exports = {
	getOcrDocument : getOcrDocument,
	getConceptExtraction : getConceptExtraction
};