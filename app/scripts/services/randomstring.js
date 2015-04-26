'use strict';

/**
 * @ngdoc service
 * @name dprApp.randomstring
 * @description
 * # randomid
 * Service in the dprApp. Creates random ids.
 */
angular.module('dprApp')
    .service('randomstring', function () {
        // AngularJS will instantiate a singleton by calling "new" on this function

        this.generateid = function (stringlength) {
            var length = 8;
            if (stringlength && !isNaN(stringlength)){
                length = stringlength;
            }
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    });
