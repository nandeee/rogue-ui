'use strict';

describe('Controller: TrimCtrl', function () {

  // load the controller's module
  beforeEach(module('expsApp'));

  var TrimCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrimCtrl = $controller('TrimCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
