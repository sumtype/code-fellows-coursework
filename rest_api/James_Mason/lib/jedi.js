const mongoose = require('mongoose');
var jediSchema = new mongoose.Schema({
  name: {type: String, default: 'Civilian'},
  health: {type: Number, min: 1, max: 1000, default: 50},
  damage: {
    min : {type: Number, min: 1, max: 50, default: 5},
    max : {type: Number, min: 2, max: 50,default: 10}
  },
  accuracy: {type: Number, min: 1, max: 100, default: 50},
  force: {type: String, default: 'Neutral'}
});
module.exports = exports = mongoose.model('Jedi', jediSchema);
