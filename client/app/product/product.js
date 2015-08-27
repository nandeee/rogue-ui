'use strict';

angular.module('expsApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      })
      .state('product.read', {
        url: '/read',
        templateUrl: 'app/product/product.read.html',
        controller: 'ProductCtrl',
        controllerAs: 'vm'
      })
      .state('product.update', {
        url: '/update',
        templateUrl: 'app/product/product.update.html',
        controller: 'ProductCtrl',
        controllerAs: 'vm'
      })
      .state('product.create', {
        url: '/create',
        templateUrl: 'app/product/product.create.html',
        controller: 'ProductCtrl',
        controllerAs: 'vm'
      });
  });
