(function($angular) {

    "use strict";

    /**
     * @factory animi
     * @author Adam Timberlake <adam.timberlake@gmail.com>
     * @link https://github.com/Wildhoney/ngAnimi
     */
    $angular.module('ngAnimi').factory('animi', ['$window', '$timeout', '$q',

    function animiFactory($window, $timeout, $q) {

        var factory = {};

        /**
         * @property class
         * @type {Animi.Transition}
         */
        factory.class = new $window.Animi.Transition();

        /**
         * @method transition
         * @param element {Object}
         * @param styleDeclaration {Object}
         * @param durationMilliseconds {Number}
         * @return {$q.promise}
         */
        factory.transition = function transition(element, styleDeclaration, durationMilliseconds) {

            var defer = $q.defer();

            $timeout(function timeout() {

                // Transition the element, and then resolve the promise once it is has finished.
                factory.class.transition(element, styleDeclaration, durationMilliseconds, function finished() {
                    defer.resolve();
                });

            }, 1);

            return defer.promise;

        };

        return factory;

    }]);

})(window.angular);