var fs = require('fs'), http = require('http'), headMessage = module.exports = exports = function(res, status, ctype, bodyMsg) {
  if (status.toString() !== '404' && ctype === 'text/plain' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ctype});
    res.write(bodyMsg);
  } else if (status.toString() !== '404' && ctype === 'application/json' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ctype});
    res.write(JSON.stringify({msg: bodyMsg}));
  } else if (status.toString() === '404' && ctype === 'text/plain' && Number.isInteger(status)) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write(bodyMsg);
    return res.end();
  } else if (status.toString() === '404' && ctype === 'application/json' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ctype});
    res.write(JSON.stringify({msg: bodyMsg}));
    return res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    var errMessage = 'Error during headMessage()';
    res.write(errMessage);
    return res.end();
  }
};
