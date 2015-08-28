'use strict';

angular.module('expsApp')
  .controller('TrimCtrl', function($scope, $http, TrimService, $state, $mdToast) {
    $scope.trimJSON = config.trimFormSchema;
    $scope.trim = config.trim;
    var trimVals = {};
    var tempModel = config.tempTrim;
    $scope.allTrims = [];
    $scope.stateChange = function stateChange() {
      $state.go('product.create');
    }

    $scope.querySearch = function querySearch(query, key) {
      var results = query ? $scope.dropdownVals[key].returnList().filter(createFilterFor(query)) : $scope.dropdownVals[key].returnList();
      return results;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (angular.lowercase(item).indexOf(lowercaseQuery) !== -1);
      };
    }

    $scope.dropdownVals = {
      'trimColor': {
        'list': [],
        'returnList': function() {
          return ['abhishek', 'nandwana', 'daft', 'punk', 'nirvana', 'someRandomBand', 'getSchwifty'];
        }
      }
    }

    $scope.toastPosition = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };

    $scope.addMultiInputValue = function addMultiInputValue(value, multiInputValue) {
      if (multiInputValue === null || multiInputValue === undefined) {
        return false;
      };
      if (value.model.indexOf(multiInputValue) !== -1) {
        $mdToast.show(
          $mdToast.simple()
          .content('Duplicate value!')
          .position($scope.getToastPosition())
          .hideDelay(2000).theme("custom-toast")
        );
        return false;
      };
      value.model.push(multiInputValue);
    }

    $scope.addNewMapEntity = function addNewMapEntity(newMapEntityName, value) {
      if (newMapEntityName === null || newMapEntityName === undefined) {
        return false;
      };
      var newMapEntity = angular.copy(value.nodes.placeholder);
      newMapEntity.name = newMapEntityName;
      value.nodes[newMapEntityName] = newMapEntity;
    }

    $scope.testMapping = function testMapping() {
      var tempObj = {
        "id": "WTP47-test",
        "trimId": "WTP47-test",
        "docType": "trims",
        "color": ["Red"],
        "content": {
          "en": {
            "name": "Red Twill",
            "description": "sixYarn Dyed Tape Red"
          }
        },
        "price": {
          "in": {
            "price": "0",
            "unitPrice": "3.5"
          }
        },
        "approved": "development",
        "internalReference": {
          "goodhillId": null
        },
        "trimType": "tapes",
        "images": {
          "approved": {
            "thumbnail": "web-images/tapes/thumbnail/WTP47_0.png"
          },
          "available": {
            "thumbnail": ["web-images/tapes/thumbnail/WTP47_0.png"]
          }
        },
        "size": {
          "0.5 Inch": {
            "erpId": "TTTAP000202",
            "stock": "162.35",
            "stockAvailable": "1"
          }
        }
      };
      TrimService.create([tempObj]);
    };

    $scope.tabCheck = function tabCheck(obj, checkType) {
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
    };

    function modelToEntity(obj, parent) {
      for (var key in obj) {
        if (obj[key].leafNode) {
          parent[key] = obj[key].model;
        } else {
          parent[key] = {};
          modelToEntity(obj[key].nodes, parent[key]);
        }
      }
    }

    $scope.otherWay = function otherWay() {
      entityTomodel($scope.generateEntity($scope.trimJSON), tempModel);
    }

    function entityTomodel(obj, parent) {
      for (var key in obj) {
        if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
          entityTomodel(obj[key], parent[key].nodes);
        } else {
          parent[key].model = obj[key];
        }
      }
    }

    $scope.generateEntity = function generateEntity(obj) {
      modelToEntity(obj, trimVals);
      return trimVals;
    }
  });
