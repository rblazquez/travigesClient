'use strict';

describe('Controller: AmenitieCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var AmenitieCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmenitieCtrl = $controller('AmenitieCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AmenitieCtrl.awesomeThings.length).toBe(3);
  });
});
