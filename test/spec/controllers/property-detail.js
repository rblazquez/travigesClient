'use strict';

describe('Controller: PropertyDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var PropertyDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropertyDetailCtrl = $controller('PropertyDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PropertyDetailCtrl.awesomeThings.length).toBe(3);
  });
});
