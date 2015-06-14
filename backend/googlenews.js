var request = require('request');
var config = require('./config');
var checkError = require('./error').checkError;

var newsSearch = function(req, res, extractedData, callback) {
	var searchObj = JSON.parse(extractedData).concepts;
	var searchWords = [];
	searchWords.push(searchObj[0].concept);
	searchWords.push(searchObj[1].concept);
	searchWords.push(searchObj[2].concept);
	searchWords.push(searchObj[3].concept);
	searchWords.push(searchObj[4].concept);
	console.log(searchWords);
	
	var data = "";
	request
		.get(config.google_newsUrl(searchWords))
		.on('response', function(response) {
			
			console.log("searching google news");
			console.log(response.statusCode, response.headers['content-type']);
			checkError(req, res);
		})
		.on('data', function(chunk) {
			data += chunk;
		})
		.on('end', function() {
			callback(data);
		});
};

module.exports = newsSearch;