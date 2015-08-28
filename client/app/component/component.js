'use strict';

angular.module('expsApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('component', {
        url: '/component',
        templateUrl: 'app/component/component.html',
        controller: 'ComponentCtrl'
      })
      .state('component.read', {
        url: '/read',
        templateUrl: 'app/component/component.read.html',
        controller: 'ComponentCtrl',
        controllerAs: 'vm'
      })
      .state('component.create', {
        url: '/create',
        templateUrl: 'app/component/component.create.html',
        controller: 'ComponentCtrl',
        controllerAs: 'vm'
      })
      .state('component.update', {
        url: '/update',
        templateUrl: 'app/component/component.update.html',
        controller: 'ComponentCtrl',
        controllerAs: 'vm'
      });
  });
