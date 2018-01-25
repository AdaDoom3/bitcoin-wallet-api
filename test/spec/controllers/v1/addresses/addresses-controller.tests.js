
describe('AddressesController Tests', function() {

  var addressesController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    addressesController = require('../../../../../app/controllers/v1/addresses/addresses-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(addressesController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      addressesController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        addressesController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
