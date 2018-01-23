'use strict';
const angular = require('angular');
const forceApp = angular.module('forceApp', []);

require('./services')(forceApp);
require('./controllers')(forceApp);
require('./directives')(forceApp);
