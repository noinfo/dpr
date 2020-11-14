"use strict";angular.module("dprApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("dprApp").controller("MainCtrl",["$scope","$localStorage","randomstring",function(a,b,c){a.Math=window.Math,a.damageDiceSideOptions=["2","4","6","8","10","12","20","100"],a.difficulty=15,a.dprsets=[],a.dprrows=[],a.dprsetName=c.generateid(),a.loadDprsetKey="",a.currentset=a.dprsetName,a.serialized="",a.createdprrow=function(){return new Object(a.dprrows.length>0?{count:a.dprrows[a.dprrows.length-1].count,attack:a.dprrows[a.dprrows.length-1].attack,damageDiceCount:a.dprrows[a.dprrows.length-1].damageDiceCount,damageDiceSides:a.dprrows[a.dprrows.length-1].damageDiceSides,damageDiceBonus:a.dprrows[a.dprrows.length-1].damageDiceBonus}:{count:!1,attack:10,damageDiceCount:1,damageDiceSides:6,damageDiceBonus:2})},a.dprrows.push(a.createdprrow()),a.dprsets.push(new Object({name:a.dprsetName,data:a.dprrows})),a.calculateMultiplicator=function(b){var c=0,d=0,e=0;return angular.isNumber(b)&&(d=b),angular.isNumber(a.difficulty)&&(e=a.difficulty),c=1- -1*(d-e)*.05,c>=1?.95:.05>=c?.05:c},a.calculateDamage=function(a){var b=a.damageDiceCount*(a.damageDiceSides/2+a.damageDiceBonus);return 1>=b?1:b},a.calculateDpr=function(b){return a.calculateMultiplicator(b.attack)*a.calculateDamage(b)},a.calculateTotalDpr=function(){var b=0;return angular.forEach(a.dprrows,function(c,d){c.count&&(b+=a.calculateDpr(c))}),b},a.removeDprrow=function(b){a.dprrows.splice(b,1)},a.renameDprset=function(){if(""!=a.dprsetName){var b=a.getDprsetKeyByName(a.currentset);b>-1&&(a.dprsets[b].name=a.dprsetName,a.currentset=a.dprsetName)}},a.getDprsetKeyByName=function(b){var c=-1;return""==b?-1:(angular.forEach(a.dprsets,function(a,d){a.name==b&&(c=d)}),c)},a.loadDprset=function(){""!=a.loadDprsetKey&&(a.dprsetName=a.dprsets[a.loadDprsetKey].name,a.currentset=a.dprsetName,a.dprrows=a.dprsets[a.loadDprsetKey].data)},a.createNewSet=function(){a.dprsetName=c.generateid(),a.currentset=a.dprsetName,a.loadDprsetKey="",a.dprrows=[],a.dprrows.push(a.createdprrow()),a.dprsets.push(new Object({name:a.dprsetName,data:a.dprrows}))},a.deleteCurrentSet=function(){if(""!=a.currentset){var b=a.getDprsetKeyByName(a.currentset);b>-1&&window.confirm("Are you sure you want to delete the current set?")&&(a.dprsets.splice(b,1),a.dprsets.length<1?a.createNewSet():(a.loadDprsetKey=Object.keys(a.dprsets)[0],a.loadDprset()))}},a.getSavedSets=function(){return a.dprsets},a.reset=function(){a.dprsetName=c.generateid(),a.currentset=a.dprsetName,a.loadDprsetKey="",a.dprsets=[],a.dprrows=[],a.dprrows.push(a.createdprrow()),a.dprsets.push(new Object({name:a.dprsetName,data:a.dprrows}))},a.deserialize=function(){var b=angular.fromJson(window.prompt("Paste your saved text here."));return b&&b.length>0&&(a.dprsets=b,a.loadDprsetKey=Object.keys(a.dprsets)[0],a.loadDprset()),b}}]),angular.module("dprApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("dprApp").service("randomstring",function(){this.generateid=function(a){var b=8;a&&!isNaN(a)&&(b=a);for(var c="",d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=0;b>e;e++)c+=d.charAt(Math.floor(Math.random()*d.length));return c}});