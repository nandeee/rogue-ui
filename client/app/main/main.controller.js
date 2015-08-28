'use strict';

angular.module('expsApp')
  .controller('MainCtrl', function($scope, $state, $mdToast) {
    $scope.state = $state;
    $scope.entity = {};
    $scope.jsonView = true;

    $scope.trimJSON = config.trimFormSchema;

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

    $scope.$watch('isUpdate', function(newValue, oldValue) {
      if (newValue === undefined)
        return false;
      if (newValue) {
        $state.go($scope.state.current.name.split('.')[0] + '.update');
      } else {
        $state.go($scope.state.current.name.split('.')[0] + '.create');
      };
    });

    $scope.stateChange = function stateChange() {
      $state.go('product.create');
    }

    $scope.dropdownVals = {
      'trimColor': {
        'list': [],
        'returnList': function() {
          return ['abhishek', 'nandwana', 'daft', 'punk', 'nirvana', 'someRandomBand', 'getSchwifty'];
        }
      }
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
        if (key === 'placeholder') {
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

    $scope.showButton = function showButton() {
      var subView = $scope.state.current.name.split('.')[1];
      return (['create', 'update'].indexOf(subView) !== -1);
    }

    $scope.isSelected = function isSelected(key) {
      var view = $scope.state.current.name.split('.')[0];
      return view === key;
    }

    $scope.entity = {
      fabric: false,
      product: false,
      trim: false,
      component: false,
      style: false,
      rule: false
    };

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

    $scope.category = 'mens-chinos';

    $scope.toggleMenu = function toggleMenu(evt) {
      var target = evt.currentTarget.dataset.name;
      console.log(typeof evt.currentTarget
        .dataset.name);
      var currentState = $scope.entity[target];
      for (var key in $scope.entity) {
        console.log(typeof key);
        if (key === target) {
          $scope.entity[key] = !$scope.entity[key];
        } else {
          $scope.entity[key] = false;
        }
      }
    }
  });
