'use strict';

angular.module('expsApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Fabric',
      'link': '/fabric'
    }, {
      'title': 'Product',
      'link': '/product'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
