var url = require('url');
var querystring = require('querystring');

//apiFunction: ""
var getUrl = function(apiFunction, searchUrl) {
	var requestUrl = {
		protocol: "https",
		hostname: "api.idolondemand.com",
		pathname: "1/api/sync/" + apiFunction + "/v1"
	};
	if(searchUrl) {
		requestUrl.search = querystring.stringify({url:searchUrl});
		return url.format(requestUrl).toString() + "&apikey=" + this.idol_APIkey;
	}
	else {
		return url.format(requestUrl).toString();
	}
};

module.exports = {
	idol_APIkey : '15b6a77a-2468-49e4-9bff-1acf3728939f',
	idol_APIurl : getUrl
};