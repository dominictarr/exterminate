#!/usr/bin/env node

var shoe = require('shoe');
var http = require('http');
var shux = require('shux')();
var spawn = require('child_process').spawn;

var ecstatic = require('ecstatic')(__dirname + '/../static');
var server = http.createServer(function (req, res) {
    if (req.url === '/shell') {
        req.pipe(shux.createShell()).pipe(res);
    }
    else ecstatic(req, res)
});
server.listen(0, '127.0.0.1');

var sock = shoe(function (stream) {
    stream.pipe(shux.createShell()).pipe(stream);
});
sock.install(server, '/sock');

server.on('listening', function () {
    var port = server.address().port;
    spawn('google-chrome', [ '--app=http://localhost:' + port ]);
});
