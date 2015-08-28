'use strict';

angular.module('expsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ngMaterial',
    'ngMessages'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('core')
      .primaryPalette('pink')
      .accentPalette('indigo', {
        'default': '500'
      });

    $mdThemingProvider.theme('custom-toast');

    $mdThemingProvider.theme('red')
      .primaryPalette('red');

    $urlRouterProvider
      .otherwise('/fabric');

    //
    // For any unmatched url, redirect to /state1
    //
    // Now set up the states
    $stateProvider
      .state('state1', {
        url: '/state1',
        templateUrl: 'app/partials/state1.html'
      })
      .state('state1.list', {
        url: '/list',
        templateUrl: 'app/partials/state1.list.html',
        controller: function($scope) {
          $scope.items = ['A', 'List', 'Of', 'Items'];
        }
      })
      .state('state2', {
        url: '/state2',
        templateUrl: 'app/partials/state2.html'
      })
      .state('state2.list', {
        url: '/list',
        templateUrl: 'app/partials/state2.list.html',
        controller: function($scope) {
          $scope.things = ['A', 'Set', 'Of', 'Things'];
        }
      });
    $locationProvider.html5Mode(true);
  })
  .directive('toArray', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        ngModel.$formatters.push(function(val) {

        });
        ngModel.$parsers.push(function(val) {
          console.log(scope.value.toArray);
          if (scope.value.toArray) {
            var res = [];
            res.push(val);
            return res;
          };
          return val;
        });
      }
    };
  });
