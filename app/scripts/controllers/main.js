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

            if($scope.dprsets.length > 0){
                return new Object({
                    count: $scope.dprsets[$scope.dprsets.length - 1].count,
                    attack: $scope.dprsets[$scope.dprsets.length - 1].attack,
                    damageDiceCount: $scope.dprsets[$scope.dprsets.length - 1].damageDiceCount,
                    damageDiceSides: $scope.dprsets[$scope.dprsets.length - 1].damageDiceSides,
                    damageDiceBonus: $scope.dprsets[$scope.dprsets.length - 1].damageDiceBonus
                });
            }

            return new Object ({
                count: false,
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
        };

        $scope.calculateDpr = function (dprset) {

            return $scope.calculateMultiplicator(dprset.attack) * ( dprset.damageDiceCount * ((dprset.damageDiceSides / 2) + dprset.damageDiceBonus) );
        };

        $scope.calculateTotalDpr = function () {
            var totaldpr = 0;

            angular.forEach($scope.dprsets,function(value, key){
                if(value.count){
                    totaldpr += $scope.calculateDpr(value);
                }
            });

            return totaldpr;
        };

        $scope.removeDprset = function (key) {
            $scope.dprsets.splice(key, 1);
        }

    });