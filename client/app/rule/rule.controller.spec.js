'use strict';

describe('Controller: RuleCtrl', function () {

  // load the controller's module
  beforeEach(module('expsApp'));

  var RuleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RuleCtrl = $controller('RuleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
