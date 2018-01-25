function CoinsController() {}

function get(request, response, next, database) {
  database.collection('coins').find({}).toArray(function(error, coins) {
    if (error) { response.status(500).json(error); return next(); }
    response.status(200).json(coins);
  });
};

CoinsController.prototype = {
  get: get
};

module.exports = new CoinsController();
