var Router = require(__dirname + '/../lib/router'), http = require('http'), fs = require('fs'), headMessage = require(__dirname + '/../lib/headMessage'), router = new Router(), requestCount = 0;
router.get('/test1', function (req, res) {
  headMessage(res, 200, 'text/plain', 'test stuff 1 ');
  return res.end();
});
router.get('/test2', function(req, res) {
  headMessage(res, 200, 'application/json', 'test stuff 2');
  return res.end();
});
router.post('/data/', function(req, res) {
  var requestFile = '/../data/' + ++requestCount + '.json', filestream = fs.createWriteStream(__dirname + requestFile), resBody = '';
  req.pipe(filestream);
  req.on('data', (chunk) => resBody += chunk);
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello, user ' + (JSON.parse(resBody).name));
    return res.end();
  });
});
var server = http.createServer(router.route());
module.exports = exports = server.listen(3000);
