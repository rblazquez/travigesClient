'use strict';

describe('Controller: AmenitieCreationCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var AmenitieCreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmenitieCreationCtrl = $controller('AmenitieCreationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AmenitieCreationCtrl.awesomeThings.length).toBe(3);
  });
});
