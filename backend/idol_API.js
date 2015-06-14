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

var extractFromUrl = function(req, res, searchUrl, callback) {
	console.log("responding to url ", searchUrl);
	
	var getUrl = config.idol_APIurl("extractconcepts", searchUrl);
	console.log("POST: ", getUrl);
	
	var data = "";
	
	request
		.get(getUrl)
		.on('response', function(response) {
			console.log(response.statusCode, response.headers['content-type']);
			checkError(req, res);
		})
		.on('data', function(chunk) {
			data += chunk;
		})
		.on('end', function() {
			console.log("finished concept extraction");
			return callback(data);
		});
}

//extracts concept from target url, write json to and end response
var getConceptExtraction = function(req, res, dataFile, callback) {
	console.log("responding to concept extract: ", dataFile);

	var getUrl = config.idol_APIurl("extractconcepts");
	console.log("POST: ", getUrl);
	//write json to response
	
	var formData = {
		"file": fs.createReadStream(data),
		"apikey": config.idol_APIkey
	};
	
	var data = "";
	
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
			data += chunk;
		})
		.on('end', function() {
			console.log("finished Concept Extraction");
			fs.unlink(dataFile, function(err) {
				if(err) { throw err; }
				else console.log("deleted temp file");
			});
			return callback(data);
		});
};

var filterData = function(data) {
	var string="{\"data\":[";
	var count=0;
	var index=0;
	
	while(count<3){
		string+="{";
		string+="\"title\":";
		var startParse=data.indexOf("<title>",index);
		var endParse=data.indexOf("</title>",index);
		string+="\""+data.substring(startParse+7,endParse)+"\""+",";
		index=endParse+1;
		
		string+="\"pubDate\":";
		var startParse=data.indexOf("<pubDate>",index);
		var endParse=data.indexOf("</pubDate>",index);
		string+="\""+data.substring(startParse+9,endParse)+"\"";
		index=endParse+1;
		
		string+="}";
		if(count!=2)
		{
			string+=",";
		}
		
		count++;
	}
	string+="]}";
	return string;
}

module.exports = {
	extractFromPhoto: extractFromPhoto,
	extractFromUrl: extractFromUrl,
	filterData: filterData
};