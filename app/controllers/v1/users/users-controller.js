
function UsersController() {
}

function get(req, res, next) {
  res.status(200).json({ hello: 'world' });
}

UsersController.prototype = {
  get: get
};

var usersController = new UsersController();

module.exports = usersController;
