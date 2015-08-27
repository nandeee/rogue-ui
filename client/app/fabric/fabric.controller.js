'use strict';

angular.module('expsApp')
  .controller('FabricCtrl', function($scope, $http) {
    $scope.fabricJSON = config.fabricFormSchema;
    $scope.fabric = config.fabric;
    var fabricVals = {};
    var tempModel = config.tempFabric;
    $scope.allFabrics = [];

    // $http.get('/api/fabrics').
    //   then(function(response) {
    //     $scope.allFabrics = response.data.data;
    //     // this callback will be called asynchronously
    //     // when the response is available
    //   }, function(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //   });

    $scope.gridOptions = {
      data: 'allFabrics',
    };

    $scope.tabCheck = function tabCheck (obj, checkType) {
      var res = true;
      for (var key in obj) {
        if (checkType === 'noLeaves') {
          if (obj[key].leafNode) {
            res = false;
            break;
          }
        } else {
          if (!obj[key].leafNode) {
            res = false;
            break;
          }
        }
      }
      return res;
    }

    function modelToEntity (obj, parent) {
      for (var key in obj) {
        if (obj[key].leafNode) {
          parent[key] = obj[key].model;
        } else {
          parent[key] = {};
          modelToEntity(obj[key].nodes, parent[key]);
        }
      }
    }

    $scope.otherWay = function otherWay () {
      entityTomodel($scope.generateEntity($scope.fabricJSON), tempModel);
    }

    function entityTomodel (obj, parent) {
      for (var key in obj) {
        if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
          entityTomodel(obj[key], parent[key].nodes);
        } else {
          parent[key].model = obj[key];
        }
      }
    }

    $scope.generateEntity = function generateEntity (obj) {
      modelToEntity(obj, fabricVals);
      return fabricVals;
    }
  });
