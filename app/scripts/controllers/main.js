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

        $scope.calculateMultiplicator = function(){
            var multiplicator = 0,
                attack = 0, difficulty = 0;

            if(angular.isNumber($scope.attack)){
                attack = $scope.attack;
            }
            if(angular.isNumber($scope.difficulty)){
                difficulty = $scope.difficulty;
            }

            multiplicator = 1 - ( -1 * ( attack - difficulty ) * 0.05 );

            if(multiplicator === 0 || multiplicator >= 1){
                return 0.95;
            }

            if(multiplicator <= 0.05){
                return 0.05;
            }


            return multiplicator;
        }

    });