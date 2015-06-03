var util = require('util');
var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: 'ZjTQ7FA8sW95rXsSPsQKAdbzJ',
  consumer_secret: 'N63XrapgRcJdhmFNxmqoLbkCuIxbwK57rCOI0IgfXBi5AardCy',
  access_token_key: '154778223-cOCmURdqgFViEkASZpkk6EEiGZCBf8p4583Su1eu',
  access_token_secret: 'QiFIUTGzqQtlFsiJVOFtBUhbm4S2OzSQ01ox2ekfBJsKv'
});

var keyword = process.argv[2]; //第一引数
var option = {'track': keyword};
console.log(keyword+'を含むツイートを取得します。');

var fs = require('fs');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
}).listen(3000);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});

twit.stream('statuses/filter', option, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('msg', data.text);
    console.log(data);
  });
});