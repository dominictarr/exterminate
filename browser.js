var through = require('through');
var Terminal = require('./vendor/term.js');

module.exports = function (cols, rows, handler) {
    var term = Terminal(cols, rows, handler);
    term.open();
    
    var tr = through(function (buf) { term.write(buf) });
    term.on('key', function (key) { tr.queue(key) });
    
    tr.appendTo = function (target) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        }
        target.appendChild(term.element);
    };
    
    tr.listenTo = function (elem) {
        elem.addEventListener('keydown', function (ev) {
            term.keyDown(ev)
        }, true);
        
        elem.addEventListener('keypress', function (ev) {
            term.keyPress(ev)
        }, true);
    };
    
    return tr;
};
