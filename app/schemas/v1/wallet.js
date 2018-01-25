const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var wallet = new Schema({
  name:  String,
  coin: {name: String, symbol: String},
  keys: [{public: String, private: String}]
});

module.exports = wallet;
