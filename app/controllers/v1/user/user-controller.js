
function UserController() {
}

function get(req, res, next) {
  res.status(200).json({ hello: 'world' });
}

UserController.prototype = {
  get: get
};

var userController = new UserController();

module.exports = userController;
