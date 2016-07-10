'use strict';

describe('Controller: AmenitieDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var AmenitieDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmenitieDetailCtrl = $controller('AmenitieDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AmenitieDetailCtrl.awesomeThings.length).toBe(3);
  });
});
