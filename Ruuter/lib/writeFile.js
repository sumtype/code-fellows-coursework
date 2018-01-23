var fs = require('fs'), mkdirp = require('mkdirp'), Buffer = require('buffer').Buffer;
function writeFile(path, ext, data, options,callback) {
  if ((path === undefined) || (ext === undefined) || (data === undefined) || (options === undefined)) {
    return 'Error:  All function parameters (path, extension, data, and options) except callback must be declared.';
  }
  if (typeof path !== 'string') return 'Error: The path parameter must be a string.';
  if (typeof ext !== 'string') return 'Error: The ext parameter must be a string.';
  if ((typeof data !== 'string') || (Buffer.isBuffer(data))) return 'Error: The data parameter must be a string or a buffer.';
  if (typeof options !== 'object') return 'Error: The options parameter must be an object.';
  if (callback !== undefined && typeof callback !== 'function') return 'Error: The callback parameter must be a function.';
  var name = 'untitled';
  if (ext[0] !== '.') ext = '.' + ext;
  if (options.namingConvention === 'date') name = ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + '-' + (new Date()).getFullYear();
  if (options.namingConvention === 'time') name = (new Date()).getHours() + '-' + (new Date()).getMinutes() + '-' + (new Date()).getSeconds() + '-' + (new Date()).getMilliseconds();
  if (options.namingConvention === 'dateTime') name = ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + '-' + (new Date()).getFullYear() + '_' + (new Date()).getHours() + '-' + (new Date()).getMinutes() + '-' + (new Date()).getSeconds() + '-' + (new Date()).getMilliseconds();
  var fileName = path + name + ext;
  fs.readdir(path, function(err) {
    if(err) mkdirp.sync(path);
    fs.access(fileName, function(errF) {
      if(errF) fs.writeFileSync(fileName, data);
      if(options.overwrite) {
        fs.access(fileName, fs.W_OK, function(errW) {
          if(errW) throw errW;
          fs.writeFileSync(fileName, data);
          if (callback !== undefined) callback();
        });
      } else {
        if (callback !== undefined) callback();
      }
    });
  });
};
module.exports = exports = writeFile;
