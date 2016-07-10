'use strict';

describe('Service: uidGenerator', function () {

  // load the service's module
  beforeEach(module('travigesfeApp'));

  // instantiate service
  var uidGenerator;
  beforeEach(inject(function (_uidGenerator_) {
    uidGenerator = _uidGenerator_;
  }));

  it('should do something', function () {
    expect(!!uidGenerator).toBe(true);
  });

});
