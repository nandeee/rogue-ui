'use strict';

angular.module('expsApp')
  .factory('FabricService', function($http, $log, $q) {
    return {
      create: function(obj) {
        return $http.post(config.backend + 'fabrics', obj);
      },
      get: function(category) {
        return $http.get(config.backend + 'fabrics/category/mens-suits?index=1&size=194').then(function(response) {
          return response;
        });
      },
      getById: function(fabricId) {
        return $http.get(config.backend + 'fabrics/' + fabricId + '?complete=true').then(function(response) {
          return response;
        });
      }
    };
  });
