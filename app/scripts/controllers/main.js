'use strict';

/**
 * @ngdoc function
 * @name dprApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dprApp
 */
angular.module('dprApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
