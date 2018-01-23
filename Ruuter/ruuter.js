var Router = require(__dirname + '/lib/router.js'), router = new Router();
/*
  Your router route functions go here.  For example, somthing like this...
  router.get('/urlToYourPage', function(req, res) {
    //Stuff that goes on when the client requests '/urlToYourPage' from your server.  Write files, send headers, be creative.
  });
*/
exports.server = require('http').createServer(router.route()).listen(3000);
exports.Router = require(__dirname + '/lib/router.js');
exports.writeFile = require(__dirname + '/lib/writeFile.js');
exports.headMessage = require(__dirname + '/lib/headMessage.js');
