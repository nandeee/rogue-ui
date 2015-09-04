'use strict';

angular.module('expsApp')
  .factory('TrimService', function($http, $log) {
    return {
      create: function(obj) {
        // if (id.length) {
        //   id = id.join();
        // }
        // $log.log('SERVICE:Trims,FN:getByIds');
        // if (!id) {
        //   $log.log('ERROR:empty id passed');
        //   return [];
        // }
        return $http.post(config.backend + 'trims/buttons', obj);
      }
    };
  });
