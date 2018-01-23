'use strict';
const mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
  url: { type: String, default: '' },
  description: { type: String, default: 'This is an image.' }
});
module.exports = exports = mongoose.model('Image', imageSchema);
