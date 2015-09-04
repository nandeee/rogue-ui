'use strict';

angular.module('expsApp')
  .controller('ComponentCtrl', function($scope, $http, ComponentService, $state) {
    // $scope.componentJSON = config.componentFormSchema;
    // $scope.component = config.component;
    // var componentVals = {};
    // // var tempModel = config.tempComponent;
    // $scope.allComponents = [];
    // $scope.stateChange = function stateChange() {
    //   $state.go('product.create');
    // }

    // $scope.testMapping = function testMapping() {
    //   var tempObj = {
    //     "id": "WTP47-test",
    //     "componentId": "WTP47-test",
    //     "docType": "components",
    //     "color": ["Red"],
    //     "content": {
    //       "en": {
    //         "name": "Red Twill",
    //         "description": "sixYarn Dyed Tape Red"
    //       }
    //     },
    //     "price": {
    //       "in": {
    //         "price": "0",
    //         "unitPrice": "3.5"
    //       }
    //     },
    //     "approved": "development",
    //     "internalReference": {
    //       "goodhillId": null
    //     },
    //     "componentType": "tapes",
    //     "images": {
    //       "approved": {
    //         "thumbnail": "web-images/tapes/thumbnail/WTP47_0.png"
    //       },
    //       "available": {
    //         "thumbnail": ["web-images/tapes/thumbnail/WTP47_0.png"]
    //       }
    //     },
    //     "size": {
    //       "0.5 Inch": {
    //         "erpId": "TTTAP000202",
    //         "stock": "162.35",
    //         "stockAvailable": "1"
    //       }
    //     }
    //   };
    //   ComponentService.create([tempObj]);
    // };

    // $scope.tabCheck = function tabCheck(obj, checkType) {
    //   var res = true;
    //   for (var key in obj) {
    //     if (checkType === 'noLeaves') {
    //       if (obj[key].leafNode) {
    //         res = false;
    //         break;
    //       }
    //     } else {
    //       if (!obj[key].leafNode) {
    //         res = false;
    //         break;
    //       }
    //     }
    //   }
    //   return res;
    // };

    // function modelToEntity(obj, parent) {
    //   for (var key in obj) {
    //     if (obj[key].leafNode) {
    //       parent[key] = obj[key].model;
    //     } else {
    //       parent[key] = {};
    //       modelToEntity(obj[key].nodes, parent[key]);
    //     }
    //   }
    // }

    // $scope.otherWay = function otherWay() {
    //   entityTomodel($scope.generateEntity($scope.componentJSON), tempModel);
    // }

    // function entityTomodel(obj, parent) {
    //   for (var key in obj) {
    //     if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
    //       entityTomodel(obj[key], parent[key].nodes);
    //     } else {
    //       parent[key].model = obj[key];
    //     }
    //   }
    // }

    // $scope.generateEntity = function generateEntity(obj) {
    //   modelToEntity(obj, componentVals);
    //   return componentVals;
    // }
  });
