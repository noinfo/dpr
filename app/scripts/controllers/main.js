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

        $scope.damageDiceSideOptions = ['2','4', '6', '8', '10', '12','20', '100'];
        $scope.difficulty = 15;

        $scope.dprsets = [];




        $scope.createdprset = function() {
            return new Object ({
                attack: 10,
                damageDiceCount: 1,
                damageDiceSides: 6,
                damageDiceBonus: 2
            });
        };

        $scope.dprsets.push($scope.createdprset());

        $scope.calculateMultiplicator = function(attackTemp){
            var multiplicator = 0,
                attack = 0, difficulty = 0;

            if(angular.isNumber(attackTemp)){
                attack = attackTemp;
            }
            if(angular.isNumber($scope.difficulty)){
                difficulty = $scope.difficulty;
            }

            multiplicator = 1 - ( -1 * ( attack - difficulty ) * 0.05 );
            // 0.05 percent chance to miss (1 is always a miss)
            if(multiplicator === 0 || multiplicator >= 1){
                return 0.95;
            }

            // 0.05 percent chance to hit (20 is always a hit)
            if(multiplicator <= 0.05){
                return 0.05;
            }

            return multiplicator;
        }

    });