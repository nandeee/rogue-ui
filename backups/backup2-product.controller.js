'use strict';

angular.module('expsApp')
  .controller('ProductCtrl', function($scope, $http, ProductService, $log, $timeout) {
    $scope.model = $scope.model || {
      allProducts: []
    };
    $scope.flkeys = [];
    $scope.categoryData = {};
    $scope.product = config.product;
    var productVals = {};
    var tempModel = config.tempProduct;
    $scope.tempItem = config.tempItem;

    $scope.componentDetails = {};

    $scope.componentVals = {
      'testing': ['one', 'two', 'three', '123', '231'],
      'productCustomizedJsonComponents': ["yoke", "collar", "cuff", "hem", "placket", "pocket"]
    }

    $scope.querySearch = function querySearch(query, key) {
      var results = query ? $scope.componentVals[key].filter(createFilterFor(query)) : $scope.componentVals[key];
      return results;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (angular.lowercase(item).indexOf(lowercaseQuery) !== -1);
      };
    }

    var baseObj = {
      "name": null,
      "type": "text",
      "model": null,
      "array": false,
      "dropdown": false,
      "dropdownKey": null,
      "map": false,
      "nodes": {},
      "leafNode": true
    }

    $scope.addSubComponent = function addSubComponent(selectedItem, value) {
      if (selectedItem === null || selectedItem === undefined) {
        return false;
      };
      value.nodes.subComponents.nodes[selectedItem] = {};
      $scope.subComponentState[selectedItem] = angular.copy($scope.subComponentsValues);
    }

    $scope.addComponent = function addComponent(value, item) {}
      // $scope.ctrl[key].itemDetails[prop] = {
      //   items: response,
      //   ids: [],
      //   subComponents: {},
      //   subComponentKeys: [],
      //   subComponentsValues: angular.copy($scope.subComponentsValues)
      // };
      // for (var i = 0; i < response.length; i++) {
      //   $scope.ctrl[key].itemDetails[prop].ids.push(response[i].id);
      // };

    $scope.addNewProp2 = function addNewProp2(value, selectedItem, key) {
      if (selectedItem === null || selectedItem === undefined) {
        return false;
      };
      $http.get(config.backend + 'components/componentType/' + $scope.category + '/' + selectedItem + '?fields=id,subComponents').
      then(function(response) {
        var tempObj = angular.copy(baseObj);
        tempObj['name'] = selectedItem;
        console.log(value);
        value.nodes.components.nodes[selectedItem] = tempObj;
        var componentList = [];
        response = response.data.data;
        console.log(response);
        for (var i = 0; i < response.length; i++) {
          componentList.push(response[i].id);
        };
        $scope.componentVals[selectedItem] = componentList;
        $scope.componentDetails[selectedItem] = response;
      }, function(response) {});
    }

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

    $scope.showAlert = function showAlert() {
      alert('You have been alerted!');
    }

    $scope.addComponentValue = function addComponentValue(key, selectedItem) {
      if (selectedItem === null || selectedItem === undefined) {
        if ($scope.componentVals.hasOwnProperty(key + 'SubComponents')) {
          var subComponents = $scope.productJSON.product.nodes.customizedJson.nodes.subComponents.nodes;
          for (var i = 0; i < $scope.componentVals[key + 'SubComponents'].length; i++) {
            if (subComponents.hasOwnProperty($scope.componentVals[key + 'SubComponents'][i])) {
              delete subComponents[$scope.componentVals[key + 'SubComponents'][i]];
              delete $scope.subComponentState[$scope.componentVals[key + 'SubComponents'][i]];
            };
          };
          delete $scope.componentVals[key + 'SubComponents'];
        };
      };
      console.log(selectedItem);
      console.log($scope.componentVals[key + 'SubComponents']);
      console.log('above');
      var selectedItemDetails;
      var subComponentList = [];
      for (var i = 0; i < $scope.componentDetails[key].length; i++) {
        if ($scope.componentDetails[key][i].id === selectedItem) {
          selectedItemDetails = $scope.componentDetails[key][i];
          for (var prop in selectedItemDetails.subComponents) {
            subComponentList.push(prop);
          }
          $scope.componentVals[key + 'SubComponents'] = subComponentList;
          break;
        };
      };
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
        'model': null
      },
      'button': {
        'name': 'button',
        'state': false,
        'model': null
      },
      'tape': {
        'name': 'tape',
        'state': false,
        'model': null
      },
      'fabric': {
        'name': 'fabric',
        'state': false,
        'model': null
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
