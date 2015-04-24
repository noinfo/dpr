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

        $scope.difficulty = 15;
        $scope.attack = 10;

        $scope.damageDiceSideOptions = ['2','4', '6', '8', '10', '12','20', '100'];

        $scope.damageDiceCount = 1;
        $scope.damageDiceSides = 6;
        $scope.damageDiceBonus = 2;

    });