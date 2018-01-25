const Schema = require('mongoose').Schema;
const bitcoin = require('bitcoinjs-lib');
var Blockchain = require('cb-blockr')
var blockchain = new Blockchain('testnet')

var wallet = new Schema({
  name:  String,
  coin: {name: String, symbol: String},
  keys: [String]
});

wallet.statics.toKeyPair = function (wif){
  return bitcoin.ECPair.fromWIF (wif);
};

wallet.methods.generateNewKeyPair = function() {
  this.keys.push(bitcoin.ECPair.makeRandom().toWIF());
};

wallet.methods.getKeysAsECPairs = function() {
  return this.keys.map((wif) => bitcoin.ECPair.fromWIF (wif));
};

wallet.methods.getKeysAsAddresses = function() {
  return this.keys.map((wif) => bitcoin.ECPair.fromWIF(wif).getAddress());
};

wallet.methods.retrieveAllTransactions = function () {
  return new Promise((resolve, reject) => {
    blockchain.addresses.transactions(this.getKeysAsAddresses(), 0, (error, transactions) => {
      if (error) { reject (error); }
      resolve (transactions);
    });
  });
};

module.exports = wallet;
