var twitter = require('ntwitter');
var tw = new twitter({
  consumer_key: 'ZjTQ7FA8sW95rXsSPsQKAdbzJ',
  consumer_secret: 'N63XrapgRcJdhmFNxmqoLbkCuIxbwK57rCOI0IgfXBi5AardCy',
  access_token_key: '154778223-cOCmURdqgFViEkASZpkk6EEiGZCBf8p4583Su1eu',
  access_token_secret: 'QiFIUTGzqQtlFsiJVOFtBUhbm4S2OzSQ01ox2ekfBJsKv'
});

tw.stream('statuses/filter', {'track':'ネパール'}, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
  });
});