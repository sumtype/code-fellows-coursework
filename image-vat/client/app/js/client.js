'use strict';
require('jquery');
require('lightbox2');
var Masonry = require('masonry-layout');
const angular = require('angular');
const imageVatApp = angular.module('imageVatApp', []);

require('./services')(imageVatApp);
require('./controllers')(imageVatApp);
require('./directives')(imageVatApp);

var msnry = new Masonry('.grid', {
  itemSelector: '.grid-item',
  columnWidth: 0,
  fitWidth: true
});
setInterval(function() {
  msnry.reloadItems();
  msnry.layout();
}, 100);
