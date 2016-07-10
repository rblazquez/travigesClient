'use strict';

describe('Service: commonRestDao', function () {

  // load the service's module
  beforeEach(module('travigesfeApp'));

  // instantiate service
  var commonRestDao;
  beforeEach(inject(function (_commonRestDao_) {
    commonRestDao = _commonRestDao_;
  }));

  it('should do something', function () {
    expect(!!commonRestDao).toBe(true);
  });

});
