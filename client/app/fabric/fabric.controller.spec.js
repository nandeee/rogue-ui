'use strict';

describe('Controller: FabricCtrl', function () {

  // load the controller's module
  beforeEach(module('expsApp'));

  var FabricCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FabricCtrl = $controller('FabricCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
