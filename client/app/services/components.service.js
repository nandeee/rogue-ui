// /*global config */
// 'use strict';

// angular.module('mystiqueApp')
//   .factory('ComponentService', function($http, $q) {
//     return {
//       getAll: function() {
//         return $http.get(config.backend + 'components');
//       },
//       getByCategory: function(category) {
//         return $http.get(config.backend + 'components/category/' + category);
//       },
//       getByComponentType: function(category, componentType) {
//         return $http.get(config.backend + 'components/' + category + '/' + componentType);
//       },
//       getById: function(componentId) {
//         return $http.get(config.backend + 'components/' + componentId);
//       },
//       getByIds: function(ids) {
//         return $http.get(config.backend + 'components/getByIds/?data=' + ids.join()).then(function(response) {

//           return response;
//         });


//       }
//     };
//   });
