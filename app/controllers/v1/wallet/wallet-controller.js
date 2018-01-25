var ObjectID = require('mongodb').ObjectID;

function WalletController() {}

/**
  * Returns all wallets
  */
function get(request, response, next, database) {
  if (!request.params.id) { response.status(400).json({error: 'No id supplied'}); return; }

  var id;
  try           { id = new ObjectID.createFromHexString(request.params.id); } 
  catch (error) { response.status(400).json({error: 'Invalid Id supplied'}); return; }

  database.collection('wallets').findOne({_id: id}, function(error, wallet) {
    if (error)   { response.status(400).json(error); return; }
    if (!wallet) { response.sendStatus(404);         return; }
    response.status(200).json(wallet);
  });
};

function post(request, response, next, database) {
  if (!request.body) { response.status(400).json({error: 'No body supplied'}); return; }

  database.collection('wallets').insert(request.body, function(error, result) {
    if      (error)                      { response.status(400).json(error); }
    else if (!result.result.ok)          { response.sendStatus(500); }
    else if (result.insertedCount === 1) { response.status(200).json(result.ops[0]); }
    else                                 { response.status(200).json(result.ops); }
  });
};

function put(request, response, next, database) {
  if (!request.params.id) { response.status(400).json({error: 'No id supplied'});   return; }
  if (!request.body)      { response.status(400).json({error: 'No body supplied'}); return; }

  var id;
  try           { id = new ObjectID.createFromHexString(request.params.id); } 
  catch (error) { response.status(400).json({error: 'Invalid Id supplied'}); return; }

  database.collection('wallets').findAndModify({_id: id}, [['_id', 1]], request.body, {new:true}, function(error, result) {
    if      (error)                                   { response.status(400).json(error); }
    else if (!result.ok)                              { response.sendStatus(500); }
    else if (!result.lastErrorObject.n)               { response.sendStatus(404); }
    else if (!result.lastErrorObject.updatedExisting) { response.sendStatus(404); }
    else                                              { response.status(200).json(result.value); }
  });
};

function del(request, response, next, database) {
  if (!request.params.id) { response.status(400).json({error: 'No id supplied'}); return; }

  var id;
  try           { id = new ObjectID.createFromHexString(request.params.id); } 
  catch (error) { response.status(400).json({error: 'Invalid Id supplied'}); return; }

  database.collection('wallets').remove({_id: id}, {fullResult:true}, function(error, result) {
    if (error) { response.status(400).json(error); return; }
    response.status(200).json(result);
  });
};

WalletController.prototype = {
  get: get,
  post: post,
  put: put,
  delete: del
};

module.exports = new WalletController();
