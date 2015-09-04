'use strict';

angular.module('expsApp')
  .controller('MainCtrl', function($scope, $state, $mdToast, TrimService, $http) {
    $scope.state = $state;
    $scope.entity = {};
    $scope.jsonView = true;

    $scope.trimJSON = angular.copy(config.trimFormSchema);
    $scope.componentJSON = config.componentFormSchema;
    $scope.Embroidery = config.Embroidery;

    $scope.makeReq = function makeReq () {
      var tempObj = $scope.formToEntity($scope.trimJSON);
      var tempArr = [];
      tempArr.push(tempObj.trim);
      TrimService.create(tempArr);
    }

    $scope.testFunction = function testFunction(asdf) {
      console.log(asdf);
      // $http.get(config.backend + 'components/COL001?complete=true').
      $http.get(config.backend + 'trims/buttons/BTN1?complete=true').
      then(function(response) {
        var tempObj = response.data.data;
        console.log(tempObj);
        // $scope.componentJSON = angular.copy(config.componentFormSchema);
        // $scope.generateForm(tempObj, $scope.componentJSON.component.nodes);
        $scope.trimJSON = angular.copy(config.trimFormSchema);
        $scope.generateForm(tempObj, $scope.trimJSON.trim.nodes);
        // this callback will be called asynchronously
        // when the response is available
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

    $scope.generateForm = function generateForm(obj, parent) {
      for (var key in obj) {
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
          return ['asdf', 'hello', 'testing', '123', 'foo', 'bar'];
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

    $scope.disallowedKeys = ['placeholder', 'createdBy', 'createdTime', 'lastModifiedTime', 'liveDateOnWeb'];

    $scope.generateEntity = function generateEntity(obj, parent) {
      for (var key in obj) {
        if ($scope.disallowedKeys.indexOf(key) !== -1) {
          continue;
        };
        // if (key === 'placeholder') {
        //   continue;
        // };
        if (obj[key].leafNode) {
          parent[key] = obj[key].model;
        } else {
          parent[key] = {};
          generateEntity(obj[key].nodes, parent[key]);
        }
      }
    }

    $scope.entityToForm = function entityToForm(tempObj) {

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
