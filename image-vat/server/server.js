'use strict';
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var dbURI = process.env.DATABASE_URI || 'mongodb://localhost/local_vat';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
  console.log();
  console.log('Mongoose connected to [' + dbURI + '] successfully.');
  console.log();
});
mongoose.connection.on('error', function(err) {
  console.log();
  console.log('Mongoose failed to connect to [' + dbURI + '].  Error, ' + err);
  console.log();
});
mongoose.connection.on('disconnected', function() {
  console.log();
  console.log('Mongoose has disconnected from [' + dbURI + '].');
  console.log();
});
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});
app.use(express.static(__dirname + '/public'));
var imagesRoute = require(path.join(__dirname, 'lib', 'routes', 'imagesRoute.js'));
app.use('/api', imagesRoute);
const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log();
  console.log('Resource server now running on port ' + port + '.');
  console.log();
});
module.exports = exports = app;
process.on('exit', function() {
  console.log();
  console.log('Image Vat Server application now exiting.');
  console.log();
  process.exit(0);
});
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log();
    console.log('Mongoose connection has closed due to server termination from the console.');
    console.log();
    console.log();
    console.log('Resource server on port ' + port + ' closed due to termination from the console.');
    console.log();
    process.exit(0);
  });
});
process.on('uncaughtException', function() {
  console.log();
  console.log('Uncaught exception from resource server on port ' + port + '.');
  console.log();
});
