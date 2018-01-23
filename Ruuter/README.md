# About Ruuter

A basic framework for creating an HTTP server with routes.  Easily write files and header messages upon requests.

# Installation

```
npm install ruuter
```
# Getting Started

Ruuter consists of an HTTP router and helpful methods that streamline writing response headers and expand options for writing data to a new file. Here is the simplest way to implement Ruuter:

### Creating a new router: `.Router()`

The Router constructor function initializes a basic router object.
The following example demonstrates typical implementation.

```javascript
var ruuter = require('ruuter');
var router = new ruuter.Router();
```

### Setting Up Routes

Each Router instance defines basic HTTP methods (GET, POST, PUSH, DELETE, etc.)  to be contained within the main object.

The following example demonstrates how to create a create a `GET` request to `/test1`:
```javascript
var router = new ruuter.Router();
router.get('/test1', function (req, res) {
  headMessage(res, 200, 'text/plain', 'test stuff 1 ');
  return res.end();
});
```

### Writing a server response: `.headMessage(res, status, Content-Type, Status-Message)`

```
ruuter.headMessage(res, status, Content-Type, Status-Message);
```

The ruuter headMessage function takes the server response, status code, content type, and status message as arguments. The function takes these arguments and writes the response header and message automatically.

### Writing a new file: `.writeFile(path, ext, data, options[,callback])`

The ruuter writeFile function offers users a variety of options for naming and saving new files.

The following example demonstrates proper use of this function:

```javascript
var ruuter = require('ruuter');
var writeFile = ruuter.writeFile(path, ext, data, options[,callback]);
```
`options` is an object or string with the following defaults:

```
{
  namingConvention: null,
  overwrite: null
}
```

When `options.namingConvention` equals ``‘date’``, the new file will be named using the current date, with the format: year-month-day (e.g. 2016-1-3).  

When `options.namingConvention` equals ``‘time’``, the new file will be named using the current time, with the format: hours-minutes-seconds-milliseconds (e.g. 15-8-3-5)).    

When `options.namingConvention` equals ``‘dateTime’``, the new file will be named using the current date and time (e.g. 2016-1-3_15-8-3-5).  

When `options.overwrite` equals `true`, the new file will overwrite any existing file with the same name.

When `options.overwrite` equals `false`, the new file will not overwrite any existing file with the same name.

####Authors

[Jesse Thach](https://github.com/jessethach), [Eugene Troy](https://github.com/energene), [Chris Lee](https://github.com/clee46), and [James Mason](https://github.com/sumtype)
