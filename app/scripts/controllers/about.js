'use strict';

/**
 * @ngdoc function
 * @name dprApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dprApp
 */
angular.module('dprApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
