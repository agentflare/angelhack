var url = require('url');
var querystring = require('querystring');

//apiFunction: ""
var getIdolUrl = function(apiFunction, searchUrl) {
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

//eats a query list
var getGoogleUrl = function(query) {
	var queryString = query.join(" ");
	var requestUrl = {
		protocol: "https",
		hostname: "news.google.com",
		pathname: "news/section",
		search: querystring.stringify({"q": queryString})
	};
	return url.format(requestUrl).toString() + "&output=rss";
};

module.exports = {
	idol_APIkey : '15b6a77a-2468-49e4-9bff-1acf3728939f',
	idol_APIurl : getIdolUrl,
	google_newsUrl : getGoogleUrl
};