var url = require('url');
var querystring = require('querystring');

//apiFunction: ""
var getUrl = function(apiFunction, textData) {
	var requestUrl = {
		protocol: "https",
		hostname: "api.idolondemand.com",
		pathname: "1/api/sync/" + apiFunction + "/v1"
	};
	return url.format(requestUrl).toString();
};

module.exports = {
	idol_APIkey : '15b6a77a-2468-49e4-9bff-1acf3728939f',
	idol_APIurl : getUrl
};