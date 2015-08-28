'use strict';

describe('Controller: ComponentCtrl', function () {

  // load the controller's module
  beforeEach(module('expsApp'));

  var ComponentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComponentCtrl = $controller('ComponentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
