'use strict';

/**
 * @ngdoc function
 * @name dprApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dprApp
 */
angular.module('dprApp')
    .controller('MainCtrl', function ($scope,$localStorage, randomstring) {
        // load math for rounding
        $scope.Math = window.Math;

        $scope.damageDiceSideOptions = ['2','4', '6', '8', '10', '12','20', '100'];
        $scope.difficulty = 15;

        $scope.dprsets = [];
        $scope.dprrows = [];

        $scope.dprsetName = randomstring.generateid();
        $scope.loadDprsetKey = '';
        $scope.currentset = $scope.dprsetName;

        $scope.serialized = '';

        $scope.createdprrow = function() {

            if($scope.dprrows.length > 0){
                return new Object({
                    count: $scope.dprrows[$scope.dprrows.length - 1].count,
                    attack: $scope.dprrows[$scope.dprrows.length - 1].attack,
                    damageDiceCount: $scope.dprrows[$scope.dprrows.length - 1].damageDiceCount,
                    damageDiceSides: $scope.dprrows[$scope.dprrows.length - 1].damageDiceSides,
                    damageDiceBonus: $scope.dprrows[$scope.dprrows.length - 1].damageDiceBonus
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

        // save demo data
        $scope.dprrows.push($scope.createdprrow());
        $scope.dprsets.push(new Object({name:$scope.dprsetName, data:$scope.dprrows}));

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
            if(multiplicator >= 1){
                return 0.95;
            }

            // 0.05 percent chance to hit (20 is always a hit)
            if(multiplicator <= 0.05){
                return 0.05;
            }

            return multiplicator;
        };

        $scope.calculateDamage = function (dprset) {
            var damage = dprset.damageDiceCount * ((dprset.damageDiceSides / 2) + dprset.damageDiceBonus);

            // minimum damage is 1 even if calculations result in something negative
            if(damage <= 1){
                return 1;
            }

            return damage;
        };

        $scope.calculateDpr = function (dprset) {

            return $scope.calculateMultiplicator(dprset.attack) * ( $scope.calculateDamage(dprset) );
        };

        $scope.calculateTotalDpr = function () {
            var totaldpr = 0;

            angular.forEach($scope.dprrows,function(value, key){
                if(value.count){
                    totaldpr += $scope.calculateDpr(value);
                }
            });

            return totaldpr;
        };

        $scope.removeDprrow = function (key) {
            $scope.dprrows.splice(key, 1);
        };

        $scope.renameDprset = function(){
            if($scope.dprsetName == ''){
                return;
            }
            var key = $scope.getDprsetKeyByName($scope.currentset);

            if(key > -1){
                $scope.dprsets[key].name = $scope.dprsetName;
                $scope.currentset = $scope.dprsetName;
            }

        };
        $scope.getDprsetKeyByName = function(name){
            var foundkey = -1;
            if(name == ''){
                return -1;
            }

            angular.forEach($scope.dprsets,function(value, key){
                if(value.name == name){
                     foundkey = key;
                }
            });
            return foundkey;
        };
        $scope.loadDprset = function(){
            if($scope.loadDprsetKey == ''){
                return;
            }
            $scope.dprsetName = $scope.dprsets[$scope.loadDprsetKey].name;
            $scope.currentset = $scope.dprsetName;
            $scope.dprrows = $scope.dprsets[$scope.loadDprsetKey].data;
        };

        $scope.createNewSet = function() {
            $scope.dprsetName = randomstring.generateid();
            $scope.currentset = $scope.dprsetName;
            $scope.loadDprsetKey = '';
            $scope.dprrows = [];
            $scope.dprrows.push($scope.createdprrow());
            $scope.dprsets.push(new Object({name:$scope.dprsetName, data:$scope.dprrows}));
        };

        $scope.deleteCurrentSet = function() {
            if($scope.currentset == ''){
                return;
            }
            var key = $scope.getDprsetKeyByName($scope.currentset);

            if(key > -1 && window.confirm('Are you sure you want to delete the current set?')){
                $scope.dprsets.splice(key, 1);

                if($scope.dprsets.length < 1){
                    $scope.createNewSet();
                }else{
                    $scope.loadDprsetKey = Object.keys($scope.dprsets)[0];
                    $scope.loadDprset();
                }
            }

        };

        $scope.getSavedSets = function() {
            return $scope.dprsets;
        };

        $scope.reset = function() {
            $scope.dprsetName = randomstring.generateid();
            $scope.currentset = $scope.dprsetName;
            $scope.loadDprsetKey = '';
            $scope.dprsets = [];
            $scope.dprrows = [];
            $scope.dprrows.push($scope.createdprrow());
            $scope.dprsets.push(new Object({name:$scope.dprsetName, data:$scope.dprrows}));

        };

        $scope.deserialize = function () {
            var tempData = angular.fromJson(window.prompt('Paste your saved text here.'));

            if(tempData && tempData.length > 0){
                $scope.dprsets = tempData;
                $scope.loadDprsetKey = Object.keys($scope.dprsets)[0];
                $scope.loadDprset();
            }

            return tempData;
        };

    });