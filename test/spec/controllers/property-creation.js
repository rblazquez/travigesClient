'use strict';

describe('Controller: PropertyCreationCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var PropertyCreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropertyCreationCtrl = $controller('PropertyCreationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PropertyCreationCtrl.awesomeThings.length).toBe(3);
  });
});
