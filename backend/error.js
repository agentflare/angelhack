var checkError = function(req, res) {
	if(res.statusCode === "404") {
		res.end("404 not found");
	}
	else if(res.statusCode === "400") {
		res.end("400 bad request");
	}
	else if(res.statusCode === "403") {
		res.end("403 forbidden");
	}
};

module.exports = {
	checkError: checkError
};