#Image Vat Server

A one resource REST API using [MongoDB](https://www.mongodb.org/), [Express](https://github.com/expressjs/express), and [Node.js](https://github.com/nodejs/node) with create and read capabilities.  To be used in conjunction with the [Image Vat Client](https://github.com/sumtype/image-vat/tree/master/client).

###Starting the Server

To use this server, first navigate to this directory inside your console and enter the following command:

$`npm install`

Next, in the same directory, enter this command to start the server (which by default runs on port 5000):

$`node server`

or

$`npm start`

the server should now be up and running.

###Testing the Server

Testing for the resource server uses [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai) with [Chai HTTP](https://github.com/chaijs/chai-http).  To run the tests, navigate to this directory in your console and enter the following command:

$`npm test`

or, if you have installed Mocha globally (via $`npm install -g mocha`)

$`mocha`

the resource server tests should now run.
