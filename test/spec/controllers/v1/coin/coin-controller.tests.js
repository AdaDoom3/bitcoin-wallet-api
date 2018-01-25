
describe('CoinController Tests', function() {

  var coinController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    coinController = require('../../../../../app/controllers/v1/coin/coin-controller');
  });

  describe('put()', function() {

    it('should be a function', function(done) {
      expect(coinController.put).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      coinController.put(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        coinController.put(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
