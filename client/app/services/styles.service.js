// /* global config */
// 'use strict';

// angular.module('mystiqueApp')
//   .factory('StyleService', function($log, $http) {
//     return {
//       get: function(id) {
//         $log.log('SERVICE:styles,FN:get');
//         if (!id) {
//           $log.log('ERROR:empty id passed');
//           return {};
//         }
//         return $http.get(config.backend + 'styles/' + id);
//       },
//       getAllByCategory: function(category) {
//         $log.log('SERVICE:styles,FN:get');
//         if (!category) {
//           $log.log('ERROR:empty category passed');
//           return {};
//         }
//         return $http.get(config.backend + 'styles/category/' + category + '?fields=id,styleId,name,productIds,description');
//       }

//     };
//   });
