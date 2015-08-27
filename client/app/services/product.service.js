'use strict';

angular.module('expsApp')
  .factory('ProductService', function($http, $log, $q) {
    return {
      get: function(category) {
        // $log.debug('SERVICE:product, FN:get');
        // if (!id) {
        //   $log.error('ERROR:empty id passed');
        //   return {};
        // }
        return $http.get(config.backend + 'products/category/' + category).then(function(response) {
          return response;
        });
        // return $http.get(config.backend + 'products/category/' + category);
        // return $http.get(config.backend + 'products/category/' + category).then(function(response) {
        //   return response.data;
        // });
        // return $http.get(config.backend + 'products/category/' + category).then(function(response) {
        //   return response.data.data;
        // });
      },
      getById: function(id) {
        $log.debug('SERVICE:product, FN:get');
        if (!id) {
          $log.error('ERROR:empty id passed');
          return {};
        }
        return $http.get(config.backend + 'products/' + id);
      }
    };
  });
