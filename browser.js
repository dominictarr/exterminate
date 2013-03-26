var through = require('through');
var shoe = require('shoe');
var stream = shoe('/sock');

var Terminal = require('./vendor/term.js');
var term = Terminal(80, 25);

term.open();
document.body.appendChild(term.element);

stream.pipe(through(function (buf) {
    term.write(buf);
}));

document.addEventListener('keydown', function (ev) {
    term.keyDown(ev)
}, true);

document.addEventListener('keypress', function (ev) {
    term.keyPress(ev)
}, true);

term.on('key', function (key) {
    console.dir(key);
    stream.write(key);
});
