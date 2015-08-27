'use strict';

angular.module('expsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fabric', {
        url: '/fabric',
        templateUrl: 'app/fabric/fabric.html',
        controller: 'FabricCtrl'
      })
      .state('fabric.read', {
        url: '/read',
        templateUrl: 'app/fabric/fabric.read.html',
        controller: 'FabricCtrl',
        controllerAs: 'vm'
      })
      .state('fabric.create', {
        url: '/create',
        templateUrl: 'app/fabric/fabric.create.html',
        controller: 'FabricCtrl',
        controllerAs: 'vm'
      });
  });
