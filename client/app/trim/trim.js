'use strict';

angular.module('expsApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('trim', {
        url: '/trim',
        templateUrl: 'app/trim/trim.html',
        controller: 'TrimCtrl'
      })
      .state('trim.read', {
        url: '/read',
        templateUrl: 'app/trim/trim.read.html',
        controller: 'TrimCtrl',
        controllerAs: 'vm'
      })
      .state('trim.create', {
        url: '/create',
        templateUrl: 'app/trim/trim.create.html',
        controller: 'TrimCtrl',
        controllerAs: 'vm'
      })
      .state('trim.update', {
        url: '/update',
        templateUrl: 'app/trim/trim.update.html',
        controller: 'TrimCtrl',
        controllerAs: 'vm'
      });
  });
