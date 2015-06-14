var fs = require('fs');
var config = require('./config');
var request = require('request');
var checkError = require('./error').checkError;

//issues uploading: may be file sync
var extractFromPhoto = function(req, res, imageFile) {
	console.log("responding to document ", imageFile);
	
	var tempPath = __dirname + "/tmp/temp_" + (+new Date()).toString() + '.txt';
	var tempStream = fs.createWriteStream(tempPath);
	
	var getUrl = config.idol_APIurl("ocrdocument");
	console.log("POST: ", getUrl);
	
	var formData = {
		"file": fs.createReadStream(imageFile),
		"apikey": config.idol_APIkey
	};
	
	request
		.post(
			{url: getUrl, formData: formData},
			function(err) {
				if(err) { return console.error('upload failed: ', err); }
				else { return console.log("upload success"); }
			}
		)
		.on('response', function(response) {
			console.log(response.statusCode, response.headers['content-type']);
			checkError(req, res);
		})
		.on('data', function(chunk) {
			tempStream.write(chunk);
		})
		.on('end', function() {
			console.log("finished getting OCR Document");
			tempStream.close();
			getConceptExtraction(req, res, tempPath);
		});
};

//extracts concept from target url, write json to and end response
var getConceptExtraction = function(req, res, data) {
	console.log("responding to concept extract: ", data);

	var getUrl = config.idol_APIurl("extractconcepts");
	console.log("POST: ", getUrl);
	//write json to response
	
	var formData = {
		"file": fs.createReadStream(data),
		"apikey": config.idol_APIkey
	};
	
	request
		.post(
			{url: getUrl, formData: formData},
			function(err) {
				if(err) { return console.error('upload failed: ', err); }
				else { return console.log("upload success"); }
			}
		)
		.on('response', function(response) {
			console.log(response.statusCode, response.headers['content-type']);
			checkError(req, res);
		})
		.on('data', function(chunk) {
			res.write(chunk);
		})
		.on('end', function() {
			console.log("finished Concept Extraction");
			res.end();
			fs.unlink(data, function(err) {
				if(err) { throw err; }
				else console.log("deleted temp file");
			});
		});
};



module.exports = {
	extractFromPhoto: extractFromPhoto
};