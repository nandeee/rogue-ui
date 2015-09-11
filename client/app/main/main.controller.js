'use strict';

angular.module('expsApp')
  .controller('MainCtrl', function($scope, $http, $state, $mdToast, FabricService, ProductService, TrimService, ComponentService) {
    $scope.state = $state;
    $scope.JSONView = false;
    $scope.fabricJSON = config.fabricFormSchema;
    $scope.productJSON = config.productFormSchema;
    $scope.trimJSON = angular.copy(config.trimFormSchema);
    $scope.componentJSON = config.componentFormSchema;
    $scope.subComponentState = {};

    $scope.disallowedKeys = ['placeholder', 'createdBy', 'createdTime', 'lastModifiedTime', 'liveDateOnWeb', 'modifiedBy'];

    $scope.entity = {
      fabric: {
        state: false
      },
      product: {
        state: false
      },
      trim: {
        state: false
      },
      component: {
        state: false
      }
    };

    $scope.category = 'mens-shirt';

    $scope.categories = [{
      name: "Men's Shirts",
      value: 'mens-shirt'
    }, {
      name: "Men's Suits",
      value: 'mens-suits'
    }, {
      name: "Men's Jeans",
      value: 'mens-jeans'
    }, {
      name: "Men's Chinos",
      value: 'mens-chinos'
    }];

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

    $scope.save = function save() {
      var tempArr = [];
      var state = $scope.state.current.name.split('.')[0];
      switch (state) {
        case 'fabric':
          var tempObj = $scope.formToEntity($scope.fabricJSON);
          tempArr.push(tempObj.fabric);
          FabricService.create(tempArr);
          break;
        case 'product':
          var tempObj = $scope.formToEntity($scope.productJSON);
          tempObj.product.customizedJson.subComponents = $scope.getSubComponents();
          tempArr.push(tempObj.product);
          ProductService.create(tempArr);
          break;
        case 'trim':
          var tempObj = $scope.formToEntity($scope.trimJSON);
          tempArr.push(tempObj.trim);
          TrimService.create(tempArr);
          break;
        case 'component':
          var tempObj = $scope.formToEntity($scope.componentJSON);
          tempArr.push(tempObj.component);
          ComponentService.create(tempArr);
          break;
        default:
      }
    }

    // Make this general and test.
    $scope.edit = function(entity) {
      var state = $scope.state.current.name.split('.')[0];
      switch (state) {
        case 'fabric':
          var fabricId = entity.fabricId;
          FabricService.getById(fabricId).then(function(response) {
            var tempObj = response.data.data;
            $scope.fabricJSON = angular.copy(config.fabricFormSchema);
            $scope.generateForm(tempObj, $scope.fabricJSON.fabric.nodes);
            $state.go('fabric.create');
          });
          break;
        case 'product':
          var productId = entity.productId;
          ProductService.getById(productId).then(function(response) {
            var tempObj = response.data.data;
            $scope.productJSON = angular.copy(config.productFormSchema);
            $scope.generateForm(tempObj, $scope.productJSON.product.nodes);
            $state.go('product.create');
          });
          break;
        case 'trim':
          break;
        case 'component':
          break;
        default:
      }
    };

    $scope.generateForm = function generateForm(obj, parent) {
      for (var key in obj) {
        if (key === 'components') {
          console.log('hmm...');
        };
        if ($scope.disallowedKeys.indexOf(key) !== -1) {
          continue;
        };
        if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
          if (parent[key].map) {
            var keys = Object.keys(obj[key]);
            for (var i = 0; i < keys.length; i++) {
              var temp = angular.copy(parent[key].nodes['placeholder']);
              temp['name'] = keys[i];
              parent[key].nodes[keys[i]] = temp;
            };
          };
          generateForm(obj[key], parent[key].nodes);
        } else {
          parent[key].model = obj[key];
        }
      }
    }

    // Add logic
    // Clean form + subComponents. Anything else?
    $scope.$watch('category', function(newValue, oldValue) {
      if (newValue === undefined)
        return false;
      console.log(newValue);
    });

    $scope.dropdownVals = {
      'trimColor': ['asdf', 'hello', 'testing', '123', 'foo', 'bar'],
      'trimContent': ['en', 'hi', 'ur'],
    }

    $scope.querySearch = function querySearch(query, key) {
      var results = query ? $scope.dropdownVals[key]
        .filter(createFilterFor(query)) : $scope.dropdownVals[key];
      return results;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (angular.lowercase(item).indexOf(lowercaseQuery) !== -1);
      };
    }

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

    $scope.generateEntity = function generateEntity(obj, parent) {
      for (var key in obj) {
        if ($scope.disallowedKeys.indexOf(key) !== -1) {
          continue;
        };
        if (obj[key].leafNode) {
          parent[key] = obj[key].model;
        } else {
          parent[key] = {};
          generateEntity(obj[key].nodes, parent[key]);
        }
      }
    }

    $scope.formToEntity = function formToEntity(obj) {
      var entity = {};
      $scope.generateEntity(obj, entity);
      return entity;
    }

    $scope.addCustomObj = function addCustomObj(value) {
      var temp = $scope.formToEntity(value.template)[value.type];
      value.model.push(temp);
    }

    $scope.showButton = function showButton() {
      var subView = $scope.state.current.name.split('.')[1];
      return (['create', 'update'].indexOf(subView) !== -1);
    }

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

    $scope.getSubComponents = function getSubComponents() {
      var processedObj = {};
      for (var prop in $scope.subComponentState) {
        processedObj[prop] = {};
        var remove = true;
        for (var key in $scope.subComponentState[prop]) {
          if ($scope.subComponentState[prop][key].state) {
            remove = false;
            processedObj[prop][key] = $scope.subComponentState[prop][key].model;
          };
        }
        if (remove) {
          delete processedObj[prop];
        };
      }
      return processedObj;
    }

    $scope.setSelectedTab = function setSelectedTab(evt) {
      var state = $scope.state.current.name.split('.')[0];
      var target = evt.currentTarget.dataset.name;
      $scope.entity[state]['selectedTab'] = target;
      // remove
      console.log($scope.entity[state]['selectedTab']);
    }

    $scope.toggleMenu = function toggleMenu(evt) {
      var target = evt.currentTarget.dataset.name;
      var currentState = $scope.entity[target].state;
      for (var key in $scope.entity) {
        if (key === target) {
          $scope.entity[key].state = !$scope.entity[key].state;
        } else {
          $scope.entity[key].state = false;
        }
      }
    }
  });
