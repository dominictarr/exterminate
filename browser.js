var through = require('through');
var shoe = require('shoe');
var stream = shoe('/sock');

stream.pipe(through(function (buf) {
    var text = document.createTextNode(buf);
    document.body.appendChild(text);
}));
