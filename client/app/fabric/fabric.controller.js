'use strict';

angular.module('expsApp')
  .controller('FabricCtrl', function($scope, $http, FabricService) {
    $scope.model = $scope.model || {
      allFabrics: []
    };

    // FabricService.get().then(function(response) {
    //   $scope.model.allFabrics = response.data.data;
    // })

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
      data: 'model.allFabrics',
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
        field: 'fabricId'
      }, {
        field: 'color'
      }, {
        field: 'collection'
      }, {
        field: 'category'
      }]
    };

    var getPage = function() {
      var index = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
      var size = paginationOptions.pageSize;
      console.log(index);
      console.log(size);
      var url = config.backend + 'fabrics/category/mens-suits?index=' + index + '&size=' + size;
      $http.get(url)
        .success(function(response) {
          console.log('oye!');
          $scope.model.allFabrics = response.data;
        });
    };
    getPage();
  });
