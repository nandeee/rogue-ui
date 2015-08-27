'use strict';

angular.module('expsApp')
  .controller('MenuCtrl', function($scope, $state) {
    $scope.state = $state;
    $scope.entity = {};

    $scope.showButton = function showButton() {
      console.log($scope.state.current.name);
      var subView = $scope.state.current.name.split('.')[1];
      return (['create', 'update'].indexOf(subView) !== -1);
    }

    $scope.entity = {
      fabric: false,
      product: false,
      trim: false,
      component: false,
      style: false,
      rules: false
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
