var express = require('express');
var app = express();
var arguments = process.argv.splice(2);
var port = arguments[0] !== 'undefined' ? arguments[0] : 4000;
var client_host = arguments[1] !== 'undefined' ? arguments[1] : "http://example.com";

var getContent = function(url, callback) {
  var content = '';
  var phantom = require('child_process').spawn('phantomjs', [__dirname + '/phantom-server.js', url]);
  phantom.stdout.setEncoding('utf8');
  phantom.stdout.on('data', function(data) {
    content += data.toString();
  });
  phantom.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});
  phantom.on('exit', function(code) {
    if (code !== 0) {
      console.log('We have an error');
    } else {
      callback(content);
    }
  });
};

var respond = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  var url = "http://"+client_host + req.params[0];
  console.log('url:', url);
  getContent(url, function (content) {
    res.send(content);
  });
}


console.log("port:", port)
console.log("client_host:", client_host)

app.get(/(.*)/, respond);
app.listen(port);
