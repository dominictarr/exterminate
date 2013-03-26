var through = require('through');
var hyperquest = require('hyperquest');

var href = process.argv[2];

var keyboard = through(function (buf) {
    if (buf.length === 1 && buf[0] === 1) return state.meta = true;
    
    if (state.meta && buf[0] === 'd'.charCodeAt(0)) {
        process.exit();
    }
    else this.queue(buf);
    state.meta = false;
});

var hq = hyperquest.post(href).on('end', process.exit);
keyboard.pipe(hq).pipe(process.stdout);

var state = { meta: false };
process.stdin.setRawMode(true);
process.stdin.pipe(keyboard);

process.on('exit', function () {
    process.stdin.setRawMode(false);
    console.log('\n[exited]');
});
