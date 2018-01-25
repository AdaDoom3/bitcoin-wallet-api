const Schema = require('mongoose').Schema;
const bitcoin = require('bitcoinjs-lib');

var wallet = new Schema({
  name:  String,
  coin: {name: String, symbol: String},
  keys: [String]
});

wallet.statics.toKeyPair = function (wif){
  return bitcoin.ECPair.fromWIF (wif);
};

wallet.methods.generateNewKeyPair = function(name) {
  this.keys.push(bitcoin.ECPair.makeRandom().toWIF());
  return this.save();
};

wallet.methods.allKeysAsECPairs = function(name, cb) {
  return this.keys.map((wif) => wallet.statics.toKeyPair (wif));
};

module.exports = wallet;
