
function WalletsController() {}

function get(request, response, next, database) {
  database.collection('wallets').find({}).toArray(function (error, wallets) {
    if (error) { response.status(400).json(error); return; }
    response.status(200).json(wallets);
  });
};

WalletsController.prototype = {
  get: get
};

module.exports = new WalletsController();
