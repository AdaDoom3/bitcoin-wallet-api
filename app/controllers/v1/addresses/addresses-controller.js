var ObjectID = require('mongodb').ObjectID;

function AddressesController() {}

function get(request, response, next, database) {
  if (!request.params.walletId) { response.status(400).json({error: 'Wallet ID is required.'}); return; }

  var id;
  try           { id = new ObjectID.createFromHexString(request.params.id); } 
  catch (error) { response.status(400).json({error: 'Invalid Id supplied'}); return; }

  database.collection('wallets').findOne({_id: 
  database.collection('coins').find({}).toArray(function(error, coins) {
    if (error) { response.status(500).json(error); return next(); }
    response.status(200).json(coins);
  });
}

AddressesController.prototype = {
  get: get
};

module.exports = new AddressesController();
