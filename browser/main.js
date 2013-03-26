var shoe = require('shoe');
var term = require('../')(80, 25);

term.pipe(shoe('/sock')).pipe(term);
term.appendTo(document.body);
term.listenTo(document);
