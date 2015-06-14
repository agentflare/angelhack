var http = require('http');

http.createServer(function (req, res) {
    console.log('request received');
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('_testcb(\'{"message": "Hello world!"}\')');
}).listen(3000);