'use strict';

describe('Controller: StyleCtrl', function () {

  // load the controller's module
  beforeEach(module('expsApp'));

  var StyleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StyleCtrl = $controller('StyleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
