// /*global config */
// 'use strict';

// angular.module('mystiqueApp')
//   .service('CustomiseService', function(ProductService, FabricService,
//     StyleService, AddtobagService, $q, $http) {
//     var self = this;

//     self.getData = function(category, productId, styleId) {
//       var defered = $q.defer();
//       $timeout(function() {
//         defered.resolve();
//       }, 5000);
//       return defered.promise;
//     }


//     self.getCustomisationData = function(productId, category, sessionData, styleId) {
//       var dataLoaded = $q.defer();
//       var data = {};
//       var productPromsie = '';
//       var stylePromise = '';
//       var arrPromise = [];

//       if (sessionData) { // if it's from session
//         productPromsie = this.getSessiondata(sessionData);
//       } else if (category && productId) {
//         productPromsie = ProductService.get(productId);
//       } else { // if it's edit product
//         productPromsie = AddtobagService.editDesignBag(productId);
//       }

//       productPromsie.then(function(response) {
//         //set product object
//         if (category || styleId) {
//           data.objProduct = response.data.data;
//         } else if (sessionData) {
//           data.objProduct = response;
//         } else {
//           data.editproductJson = response;
//           data.objProduct = response.newproductJson;
//         }
//         //set category
//         data.category = data.objProduct.category;
//         // set styleid
//         if (styleId) {
//           data.styleId = styleId;
//         } else {
//           data.styleId = data.objProduct.styleId[0];
//           if (config.defaultStyleId[data.styleId]) { // to be removed
//             data.styleId = config.defaultStyleId[data.styleId];
//           }
//         }
//         //get mainfabric
//         var fabric = data.objProduct.mainFabricId[0];
//         arrPromise.push(StyleService.get(data.styleId), FabricService.get(fabric, data.category));
//         return $q.all(arrPromise);
//       }).then(function(response) {
//         //set style and fabric
//         data.objStyle = response[0].data.data.stylesJson;
//         data.objFabric = response[1].data.data;
//         return self.staticResources(data.category);
//       }).then(function(response) {
//         data.staticResources = response.data.data;
//         dataLoaded.resolve(data);
//       });
//       return dataLoaded.promise;
//     };
//     self.getSessiondata = function(sessionData) {
//       var defer = $q.defer();
//       var data = sessionData;
//       defer.resolve(data);
//       return defer.promise;
//     };
//     self.staticResources = function(category) {
//       return $http.get(config.backend + 'categories/fetchCategoryInfo?data=' + category);
//     };
//   });
