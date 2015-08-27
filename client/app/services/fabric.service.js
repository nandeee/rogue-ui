// /*global config */
// 'use strict';

// angular.module('mystiqueApp')
//   .factory('FabricService', function($http, $log, $q) {

//     return {
//       get: function(id, category, fields) {

//         if (!category || !id) {
//           $log.debug('ERROR:empty id passed');
//           return [];
//         }

//         if (fields) {
//           return $http.get(config.backend + 'fabrics/' + category + '/' + id + '?fields=' + fields.join(',')).then(function(response) {
//             return response;
//           });
//         }

//         $log.log('SERVICE:Fabrics,FN:getIdByCategory');
//         return $http.get(config.backend + 'fabrics/' + category + '/' + id).then(function(response) {
//           return response;
//         });
//       },

//       getByCategory: function(category) {
//         $log.debug('SERVICE:Fabrics,FN:getByCategory');

//         if (!category) {
//           $log.debug('ERROR:empty id passed');
//           return [];
//         }
//         return $http.get(config.backend + 'fabrics/category/' + category + '?fields=name,mfPrice,description,images,blendDescription,blendCount,blendDesign&status=production&&isRendered=true');
//       },
//       getByIds: function(ids, category) {
//         ids = ids.join().replace(/,\s*$/, '');
//         $log.log('List Of Fabric Ids : ' + ids);

//         return $http.get(config.backend + 'fabrics/fetchFabricsInfo?data=' + ids + '&category=' + category).then(function(response) {
//           return response;
//         });
//       },
//       search: function(category, searchQuery) {
//         return $http.get(config.backend + 'fabrics/' + category + '/search?data=' + searchQuery).then(function(response) {
//           return response;
//         });
//       }
//     };
//   });
