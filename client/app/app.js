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
    'ui.grid.pagination',
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
      .otherwise('/fabric/create');

    $locationProvider.html5Mode(true);
  });
