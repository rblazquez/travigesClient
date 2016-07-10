'use strict';

describe('Service: amenitieDao', function () {

  // load the service's module
  beforeEach(module('travigesfeApp'));

  // instantiate service
  var amenitieDao;
  beforeEach(inject(function (_amenitieDao_) {
    amenitieDao = _amenitieDao_;
  }));

  it('should do something', function () {
    expect(!!amenitieDao).toBe(true);
  });

});
