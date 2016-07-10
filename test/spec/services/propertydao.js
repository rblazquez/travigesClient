'use strict';

describe('Service: propertyDao', function () {

  // load the service's module
  beforeEach(module('travigesfeApp'));

  // instantiate service
  var propertyDao;
  beforeEach(inject(function (_propertyDao_) {
    propertyDao = _propertyDao_;
  }));

  it('should do something', function () {
    expect(!!propertyDao).toBe(true);
  });

});
