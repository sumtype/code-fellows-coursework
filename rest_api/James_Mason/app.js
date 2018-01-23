const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/force_balancer');
const forceRouter = require(__dirname + '/lib/forceRoutes');
app.use('/api', forceRouter);
var PORT = process.env.PORT || 3000;
app.listen(PORT);
