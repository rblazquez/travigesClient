'use strict';

describe('Service: amenitie', function () {

  // load the service's module
  beforeEach(module('travigesfeApp'));

  // instantiate service
  var amenitie;
  beforeEach(inject(function (_amenitie_) {
    amenitie = _amenitie_;
  }));

  it('should do something', function () {
    expect(!!amenitie).toBe(true);
  });

});
