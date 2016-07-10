'use strict';

describe('Controller: PropertyListCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var PropertyListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropertyListCtrl = $controller('PropertyListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PropertyListCtrl.awesomeThings.length).toBe(3);
  });
});
