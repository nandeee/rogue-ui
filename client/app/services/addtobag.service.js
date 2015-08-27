// /*global utils*/
// /*global config*/
// 'use strict';

// angular.module('mystiqueApp')
//   .factory('AddtobagService', function($http, $q, $log) {
//     var dataCanvas = [];

//     return {
//       /*for addtobag*/
//       addToBag: function(data) {
//         var defered = $q.defer();
//         data.canvasPrintDetail = JSON.stringify(dataCanvas);
//         var sendData = utils.qs(data);
//         $http({
//           url: config.environment.creyate + '/en/cart?type=addtocart',
//           data: sendData,
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//           }
//         }).success(function(data) {
//           defered.resolve(data);
//         }).error(function(status) {
//           defered.reject(status);
//         });
//         return defered.promise;
//       },
//       setDataCanvas: function(data) {
//         dataCanvas = data;
//         $log.log(dataCanvas);
//       },
//       /*for savedesign*/
//       saveDesign: function(data) {
//         var defered = $q.defer();
//         data.canvasPrintDetail = JSON.stringify(dataCanvas);
//         var sendData = utils.qs(data);
//         $http({
//           url: config.environment.creyate + '/en/cart?type=saveproducts',
//           data: sendData,
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//           }
//         }).success(function(data) {
//           defered.resolve(data);
//         }).error(function(status) {
//           defered.reject(status);
//         });
//         return defered.promise;
//       },
//       /*for editdesign or editbag(to get edit product info)*/
//       editDesignBag: function(productId) {
//         var defered = $q.defer();
//         $http({
//           url: config.environment.creyate + '/en/cart?type=loadcustomisation&productid=' + productId,
//           method: 'GET',
//         }).success(function(data) {
//           defered.resolve(data);
//         }).error(function(status) {
//           defered.reject(status);
//         });
//         return defered.promise;
//       },
//       /*for edit and update design (bag page & save design page)*/
//       updateDesignBag: function(data) {
//         var defered = $q.defer();
//         data.canvasPrintDetail = JSON.stringify(dataCanvas);
//         var sendData = utils.qs(data);
//         $http({
//           url: config.environment.creyate + '/en/cart?type=updateitemincart',
//           data: sendData,
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//           }
//         }).success(function(data) {
//           defered.resolve(data);
//         }).error(function(status) {
//           defered.reject(status);
//         });
//         return defered.promise;
//       },
//     };
//   });
