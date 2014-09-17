(function($angular) {

    "use strict";

    /**
     * @directive ngAnimiHide
     * @author Adam Timberlake <adam.timberlake@gmail.com>
     * @link https://github.com/Wildhoney/ngAnimi
     */
    $angular.module('ngAnimi').directive('ngAnimiHide', function ngAnimiHide(animi) {
       
        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'A',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                model: '=ngAnimiHide'
            },

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                scope.$watch('model', function modelChanged() {

                    animi.transition(element, { backgroundColor: 'green', opacity: 0 }, 1000).then(function then() {
                        element.addClass('ng-hide');
                    });

                });

            }

        }
        
    });

})(window.angular);