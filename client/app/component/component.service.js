'use strict';

angular.module('expsApp')
  .factory('ComponentService', function($http, $log) {
    return {
      getIdForComponentType: function(componentType, id) {
        $log.log('SERVICE:Components,FN:getByIds');
        if (!componentType && !id) {
          $log.log('ERROR:empty id passed');
          return [];
        }
        return $http.get(config.backend + 'components/' + componentType + '/' + id);
      },
      getByIds: function(id) {
        if (id.length) {
          id = id.join();
        }
        $log.log('SERVICE:Components,FN:getByIds');
        if (!id) {
          $log.log('ERROR:empty id passed');
          return [];
        }
        return $http.get(config.backend + 'components/getByIds/?data=' + id);
      },
      create: function(obj) {
        // if (id.length) {
        //   id = id.join();
        // }
        // $log.log('SERVICE:Components,FN:getByIds');
        // if (!id) {
        //   $log.log('ERROR:empty id passed');
        //   return [];
        // }
        return $http.post(config.backend + 'components/tapes', obj);
      }
    };
  });
