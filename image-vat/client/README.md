#Image Vat Client

The client side of the image gallery, built using [Express](https://github.com/expressjs/express), [AngularJS](https://github.com/angular/angular.js), [Node.js](https://github.com/nodejs/node), [jQuery](https://github.com/jquery/jquery), [Masonry](https://github.com/desandro/masonry), and [Lightbox2](https://github.com/lokesh/lightbox2).  To be used in conjunction with the [Image Vat Server](https://github.com/sumtype/image-vat/tree/master/server).

###Starting the Client

To use the client you'll first need to install the necessary dependencies.  So, open your console and navigate to this directory.  Then enter the command:

$`npm install`

you'll probably only need to do this once.  Next you'll need to build the client application, so enter the command:

$`gulp`

this will build the application and test bundle files.  Next, to begin running the client's server, so you can use the client in your browser, enter the command:

$`node server`

or

$`npm start`

the client's server should now be up and running.  If you go to your browser and enter the URL and port you've specified for this server to run on you will now be able to use the client there (the default localhost URL uses port 9000).

###Testing the Server

Testing for the client application uses [Karma](https://github.com/karma-runner/karma), [Jasmine](https://github.com/jasmine/jasmine), and [Angular Mocks](https://www.npmjs.com/package/angular-mocks).  To run the tests, navigate to this directory in your console and enter the following command:

$`npm test`

or, if you have installed Karma globally (via $`npm install -g karma`)

$`karma start`

the client application tests should now run (the client's Karma configuration file specifies [Firefox](https://www.mozilla.org/en-US/firefox/new/) to be used for the testing environment).
