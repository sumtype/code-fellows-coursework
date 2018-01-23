'use strict';
const express = require('express');
const jsonParser = require('body-parser').json();
const path = require('path');
const error = require(path.join(__dirname, '..', 'utilities', 'error.js'));
const Image = require(path.join(__dirname, '..', 'models', 'image.js'));

var imageRouter = module.exports = exports = new express.Router();

imageRouter.get('/images', (req, res) => {
  console.log();
  console.log('GET request to "/images" begun.');
  console.log('Proceeding to find images in the database.');
  Image.find({}, (err, data) => {
    if (err) return error(res, err, 500, 'Internal server error, your request for images in the database could not be completed.');
    console.log('Successfully found images in the database.');
    console.log('GET request to "/images" ending, now sending data to the client.');
    console.log();
    return res.status(200).json(data);
  });
});
imageRouter.post('/images', jsonParser, (req, res) => {
  var newImage = new Image(req.body);
  console.log();
  console.log('POST request to "/images" begun.');
  console.log('Proceeding to save the new image.');
  newImage.save((err, data) => {
    if (err) return error(res, err, 500, 'Internal server error, your image could not be saved.');
    console.log('Successfully saved the new image.');
    console.log('POST request to "/images" ending, now sending data to the client.');
    console.log();
    return res.status(200).json(data);
  });
});
