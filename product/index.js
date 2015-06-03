var util = require('util');
var twitter = require('twitter');

var twit = new twitter({
  consumer_key: 'ZjTQ7FA8sW95rXsSPsQKAdbzJ',
  consumer_secret: 'N63XrapgRcJdhmFNxmqoLbkCuIxbwK57rCOI0IgfXBi5AardCy',
  access_token_key: '154778223-cOCmURdqgFViEkASZpkk6EEiGZCBf8p4583Su1eu',
  access_token_secret: 'QiFIUTGzqQtlFsiJVOFtBUhbm4S2OzSQ01ox2ekfBJsKv'
});

//var keyword = process.argv[2]; //第一引数
var keyword = "nepal" //第一引数
var option = {'track': keyword};
console.log(keyword+'を含むツイートを取得します。');
var path = require("path");
var fs = require('fs');
var mimeTypes = {
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.css': 'text/css'
};
var app = require('http').createServer(function(request, response) {
  if (request.url === '/favicon.ico') {
    response.writeHead(404);
    response.end('Not found.');
    return;
  }
  var lookup = decodeURI(request.url),
    f = "." + lookup;
  if (f == "./") {
    f = "index.html"
  }
  fs.exists(f, function(exists) {
    if (exists) {
      fs.readFile(f, function(err, data) {
        if (err) {
          response.writeHead(500);
          response.end('Server Error!');
          return;
        }
        var headers = {
          'Content-Type': mimeTypes[path.extname(f)]
        };
        console.log(headers);
        response.writeHead(200, headers);
        response.end(data);
      });
      return;
    }
    response.writeHead(404);
    response.end('Nod found.');
  });
}).listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0")

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});

twit.stream('statuses/filter', option, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('msg', data.text);
  });
});