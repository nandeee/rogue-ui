'use strict';

angular.module('expsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rule', {
        url: '/rule',
        templateUrl: 'app/rule/rule.html',
        controller: 'RuleCtrl'
      });
  });