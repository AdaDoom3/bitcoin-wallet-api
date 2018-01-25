
describe('CoinsController Tests', function() {

  var coinsController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    coinsController = require('../../../../../app/controllers/v1/circus/coins-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(coinsController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      coinsController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        coinsController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
