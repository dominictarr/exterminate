var shoe = require('shoe');
var http = require('http');
var shux = require('shux')();
shux.createShell('sh');

var ecstatic = require('ecstatic')(__dirname + '/static');
var server = http.createServer(function (req, res) {
    if (req.url === '/shell') {
        req.pipe(shux.attach('sh')).pipe(res);
    }
    else ecstatic(req, res)
});
server.listen(5000, '127.0.0.1');

var sock = shoe(function (stream) {
    stream.pipe(shux.attach('sh')).pipe(stream);
});
sock.install(server, '/sock');
