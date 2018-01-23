'use strict';
module.exports = exports = function(res, err, code, message) {
  console.log(err);
  console.log(code + ' error encountered while attempting to perform the request.');
  console.log();
  return res.status(code).send(message.toString());
};
