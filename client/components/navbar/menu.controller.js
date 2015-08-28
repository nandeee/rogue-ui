'use strict';

angular.module('expsApp')
  .controller('MenuCtrl', function($scope, $state) {
    $scope.state = $state;
    $scope.entity = {};
    $scope.jsonView = true;
    $scope.$watch('isUpdate', function(newValue, oldValue) {
      if (newValue === undefined)
        return false;
      if (newValue) {
        $state.go($scope.state.current.name.split('.')[0] + '.update');
      } else {
        $state.go($scope.state.current.name.split('.')[0] + '.create');
      };
    });

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
        // value: 'mens-shirts'
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
