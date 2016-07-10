'use strict';

describe('Service: halPagination', function () {

  // load the service's module
  beforeEach(module('travigesfeApp'));

  // instantiate service
  var halPagination;
  beforeEach(inject(function (_halPagination_) {
    halPagination = _halPagination_;
  }));

  it('should do something', function () {
    expect(!!halPagination).toBe(true);
  });

});
