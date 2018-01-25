const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
  email:  String,
  password: String,
  joined: {type: Date, default: Date.now},
  wallets: [{id: String}]
});

module.exports = user;
