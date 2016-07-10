'use strict';

describe('Controller: BookingCreationCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var BookingCreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookingCreationCtrl = $controller('BookingCreationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BookingCreationCtrl.awesomeThings.length).toBe(3);
  });
});
