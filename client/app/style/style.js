'use strict';

angular.module('expsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('style', {
        url: '/style',
        templateUrl: 'app/style/style.html',
        controller: 'StyleCtrl'
      });
  });