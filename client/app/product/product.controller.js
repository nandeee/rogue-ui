'use strict';

angular.module('expsApp')
  .controller('ProductCtrl', function($scope, $http, ProductService, $log, $timeout) {
    $scope.model = $scope.model || {
      allProducts: []
    };
    $scope.componentDetails = {};

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

    $scope.dropdownVals = {
      'testing': ['one', 'two', 'three', '123', '231'],
      'productCustomizedJsonComponents': ["yoke", "collar", "cuff", "hem", "placket", "pocket"]
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

    var paginationOptions = {
      pageNumber: 1,
      pageSize: 25
    };

    $scope.gridOptions = {
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
          paginationOptions.pageNumber = newPage;
          paginationOptions.pageSize = pageSize;
          getPage();
        });
      },
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      useExternalPagination: true,
      // totalItems: 194,
      data: 'model.allProducts',
      enableFiltering: true,
      columnDefs: [{
        name: 'placeholder',
        displayName: '',
        width: 50,
        enableSorting: false,
        enableCellEdit: false,
        enableFiltering: false,
        headerCellTemplate: '<span></span>',
        cellTemplate: '<div class="tableButton"><button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)">Edit</button></div>'
      }, {
        field: 'productId'
      }, {
        field: 'collection'
      }, {
        field: 'styleId'
      }, {
        field: 'price'
      }]
    };

    var getPage = function() {
      var index = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
      var size = paginationOptions.pageSize;
      console.log(index);
      console.log(size);
      var url = config.backend + 'products/category/' + $scope.category + '?index=' + index + '&size=' + size;
      $http.get(url)
        .success(function(response) {
          console.log('oye!');
          $scope.model.allProducts = response.data;
          console.log($scope.model.allProducts);
        });
    };

    getPage();

    $scope.querySearch = function querySearch(query, key) {
      var results = query ? $scope.dropdownVals[key].filter(createFilterFor(query)) : $scope.dropdownVals[key];
      return results;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (angular.lowercase(item).indexOf(lowercaseQuery) !== -1);
      };
    }

    $scope.addSubComponent = function addSubComponent(selectedItem, value) {
      if (selectedItem === null || selectedItem === undefined) {
        return false;
      };
      value.nodes.subComponents.nodes[selectedItem] = {};
      $scope.subComponentState[selectedItem] = angular.copy($scope.subComponentsValues);
    }

    $scope.addComponent = function addComponent(value, selectedItem, key) {
      if (selectedItem === null || selectedItem === undefined) {
        return false;
      };
      // Use service.
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
        $scope.dropdownVals[selectedItem] = componentList;
        $scope.componentDetails[selectedItem] = response;
      }, function(response) {});
    }

    $scope.addComponentValue = function addComponentValue(key, selectedItem) {
      if (selectedItem === null || selectedItem === undefined) {
        if ($scope.dropdownVals.hasOwnProperty(key + 'SubComponents')) {
          var subComponents = $scope.productJSON.product.nodes.customizedJson.nodes.subComponents.nodes;
          for (var i = 0; i < $scope.dropdownVals[key + 'SubComponents'].length; i++) {
            if (subComponents.hasOwnProperty($scope.dropdownVals[key + 'SubComponents'][i])) {
              delete subComponents[$scope.dropdownVals[key + 'SubComponents'][i]];
              delete $scope.subComponentState[$scope.dropdownVals[key + 'SubComponents'][i]];
            };
          };
          delete $scope.dropdownVals[key + 'SubComponents'];
        };
      };
      var selectedItemDetails;
      var subComponentList = [];
      for (var i = 0; i < $scope.componentDetails[key].length; i++) {
        if ($scope.componentDetails[key][i].id === selectedItem) {
          selectedItemDetails = $scope.componentDetails[key][i];
          for (var prop in selectedItemDetails.subComponents) {
            subComponentList.push(prop);
          }
          $scope.dropdownVals[key + 'SubComponents'] = subComponentList;
          break;
        };
      };
    }
  });
