'use strict';

describe('Controller: BookingcalendarCtrl', function () {

  // load the controller's module
  beforeEach(module('travigesfeApp'));

  var BookingcalendarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookingcalendarCtrl = $controller('BookingcalendarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BookingcalendarCtrl.awesomeThings.length).toBe(3);
  });
});
