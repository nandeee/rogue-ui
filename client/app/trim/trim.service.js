'use strict';

angular.module('expsApp')
  .factory('TrimService', function($http, $log) {
    return {
      getIdForTrimType: function(trimType, id) {
        $log.log('SERVICE:Trims,FN:getByIds');
        if (!trimType && !id) {
          $log.log('ERROR:empty id passed');
          return [];
        }
        return $http.get(config.backend + 'trims/' + trimType + '/' + id);
      },
      getByIds: function(id) {
        if (id.length) {
          id = id.join();
        }
        $log.log('SERVICE:Trims,FN:getByIds');
        if (!id) {
          $log.log('ERROR:empty id passed');
          return [];
        }
        return $http.get(config.backend + 'trims/getByIds/?data=' + id);
      },
      create: function(obj) {
        // if (id.length) {
        //   id = id.join();
        // }
        // $log.log('SERVICE:Trims,FN:getByIds');
        // if (!id) {
        //   $log.log('ERROR:empty id passed');
        //   return [];
        // }
        return $http.post(config.backend + 'trims/tapes', obj);
      }
    };
  });
