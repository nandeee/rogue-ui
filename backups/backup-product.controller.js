'use strict';

angular.module('expsApp')
  .controller('ProductCtrl', function($scope, $http, ProductService, $log, $timeout) {
    $scope.model = $scope.model || {
      allProducts: []
    };
    $scope.flkeys = [];
    $scope.categoryData = {};
    $scope.productJSON = config.productFormSchema;
    $scope.product = config.product;
    var productVals = {};
    var tempModel = config.tempProduct;
    $scope.tempItem = config.tempItem;

    var subView = $scope.state.current.name.split('.')[1];
    // if (false) {
    if (!$scope.model.allProducts.length) {
      ProductService.get($scope.category).then(function(response) {
        $scope.model.allProducts = response.data.data;
        // $scope.flkeys.push({
        //   name: 'something',
        //   field: prop
        // });
        for (var prop in response.data.data[2]) {
          $scope.gridOptions.columnDefs.push({
            minWidth: 200,
            field: prop
          });
        }
        // for (var i = 0; i < $scope.flkeys.length; i++) {
        //   $scope.gridOptions.columnDefs.push($scope.flkeys[i]);
        // };
      })
    };

    $scope.testMapping = function testMapping() {
      ProductService.get($scope.category).then(function(response) {
        $scope.model.allProducts = response.data.data;
        // $scope.flkeys.push({
        //   name: 'something',
        //   field: prop
        // });
        // for (var prop in response.data.data[2]) {
        //   $scope.gridOptions.columnDefs.push({
        //     minWidth: 200,
        //     field: prop
        //   });
        // }
        // for (var i = 0; i < $scope.flkeys.length; i++) {
        //   $scope.gridOptions.columnDefs.push($scope.flkeys[i]);
        // };
      })
    }

    $scope.subComponentsList = [];

    $scope.showAlert = function showAlert() {
      alert('You have been alerted!');
    }

    $scope.addNewProp = function addNewProp(prop, key) {
      if (prop === null || prop === undefined) {
        return false;
      };
      $scope.ctrl[key].searchText = '';
      $scope.ctrl[key].selectedItem = undefined;
      var baseObj = {
        name: null,
        type: 'text',
        leafNode: true,
        model: null,
        toArray: null,
        dropdown: null,
        multiSelect: null,
        nodes: {}
      };
      baseObj['name'] = prop;
      // baseObj['name'] = prop;
      // $scope.productJSON.product.nodes.customizedJson.nodes.components.nodes[prop] = baseObj;
      // $scope.ctrl[key].searchText = '';
      // $scope.ctrl[key].selectedItem = undefined;

      $http.get(config.backend + 'components/componentType/mens-shirt/' + prop + '?fields=id,subComponents').
      then(function(response) {
        $scope.productJSON.product.nodes.customizedJson.nodes.components.nodes[prop] = baseObj;
        response = response.data.data;
        console.log(response);
        $scope.ctrl[key].itemDetails[prop] = {
          items: response,
          ids: [],
          subComponents: {},
          subComponentKeys: [],
          subComponentsValues: angular.copy($scope.subComponentsValues)
        };
        for (var i = 0; i < response.length; i++) {
          $scope.ctrl[key].itemDetails[prop].ids.push(response[i].id);
        };
      }, function(response) {});
    }

    $scope.subComponentsValues = {
      'stitch_type': {
        'name': 'stitch_type',
        'state': false,
        'val': null
      },
      'button': {
        'name': 'button',
        'state': false,
        'val': null
      },
      'tape': {
        'name': 'tape',
        'state': false,
        'val': null
      },
      'fabric': {
        'name': 'fabric',
        'state': false,
        'val': null
      }
    };

    $http.get(config.backend + 'categories/mens-shirt').
    then(function(response) {
      $scope.categoryData.collections = response.data.data.collections;
      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    $scope.subComponentSelect = function subComponentSelect(subComponentSelectedItem, key) {
      if (subComponentSelectedItem === null || subComponentSelectedItem === undefined) {
        return false;
      };
      $scope.ctrl['component'].itemDetails[key].subComponents[subComponentSelectedItem] = {};
      $scope.ctrl['component'].itemDetails[key].subComponents[subComponentSelectedItem] = angular.copy($scope.subComponentsValues);
    }
    $scope.submitIt = function submitIt(getThis) {
      console.log(getThis);
      console.log(typeof getThis);
      ProductService.getById(getThis).then(function(response) {
        var tempRes = response.data.data;
        console.log(tempRes);
        console.log($scope.tempItem);
        entityTomodel(tempRes, $scope.productJSON.product.nodes);
        // entityTomodel(tempRes, $scope.tempItem);
        // $scope.productJSON.product.nodes = $scope.tempItem;
      });
    };

    $scope.ctrl = {
      'component': {},
      'subComponent': {}
    };
    $scope.ctrl.component.itemDetails = {};
    $scope.ctrl.component.items = ["yoke", "collar", "cuff", "hem", "placket", "pocket"];
    // $scope.ctrl.component.items = ["backoptions", "yoke", "body", "back_yoke", "lifestyle", "collar", "collar_type", "cuff", "hem", "placket", "_pocket_style", "pocket", "sleeve", "sleeve placket", "tuckin", "_fit"];
    // $scope.ctrl.states = ["backoptions", "yoke", "body", "back_yoke", "lifestyle", "collar", "collar_type", "cuff", "hem", "placket", "_pocket_style", "pocket", "sleeve", "sleeve placket", "tuckin", "_fit"];

    $scope.ctrl.selectedItemChange = function selectedItemChange(item, key) {
      if (item === undefined) {
        $scope.ctrl['component'].itemDetails[key].subComponents = {};
        return false;
      };
      console.log('item: ' + item);
      console.log('key: ' + key);
      console.log($scope.ctrl['component'].itemDetails[key]);
      var itemDetailList = $scope.ctrl['component'].itemDetails[key].items;
      for (var i = 0; i < itemDetailList.length; i++) {
        if (itemDetailList[i].id === item) {
          for (var prop in itemDetailList[i].subComponents) {
            $scope.ctrl['component'].itemDetails[key].subComponentKeys.push(prop);
          }
          // $scope.ctrl['component'].itemDetails[key].subComponents = itemDetailList[i].subComponents;
          break;
        } else {
          continue;
        };
      };
      // $scope.ctrl['component'].itemDetails[key].subComponents
    };

    $scope.ctrl.querySearch = function querySearch(query, key, details) {
      if (details) {
        var results = query ? $scope.ctrl['component'].itemDetails[key].ids.filter(createFilterFor(query)) : $scope.ctrl['component'].itemDetails[key].ids;
        return results;
      };
      var results = query ? $scope.ctrl[key].items.filter(createFilterFor(query)) : $scope.ctrl[key].items;
      return results;
    };

    // function createFilterFor(query, details) {
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        // if (details) {
        //   return (angular.lowercase(item.id).indexOf(lowercaseQuery) !== -1);
        // };
        return (angular.lowercase(item).indexOf(lowercaseQuery) !== -1);
      };
    }

    $scope.gridOptions = {
      data: 'model.allProducts',
      // rowHeight: 100,
      enableFiltering: true,
      columnDefs: []
    };

    $scope.componentList = ["backoptions", "yoke", "body", "back_yoke", "lifestyle", "collar", "collar_type", "cuff", "hem", "placket", "_pocket_style", "pocket", "sleeve", "sleeve placket", "tuckin", "_fit"];

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
    }

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
      entityTomodel($scope.generateEntity($scope.productJSON), tempModel);
    }

    function entityTomodel(obj, parent) {
      for (var key in obj) {

        // Remove the code below after testing.
        if (key === 'customizedJson') {
          continue;
        };

        if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
          entityTomodel(obj[key], parent[key].nodes);
        } else {
          parent[key].model = obj[key];
        }
      }
    }

    $scope.generateEntity = function generateEntity(obj) {
      modelToEntity(obj, productVals);
      return productVals;
    }
  });
