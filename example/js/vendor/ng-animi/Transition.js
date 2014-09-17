(function AnimiProcedures($window, $angular) {

    "use strict";

    /**
     * @module Animi
     * @submodule Transition
     * @extends Animi
     * @constructor
     */
    var Transition = $window.Animi.Transition = function() {

        /**
         * @method transition
         * @param element {Object}
         * @param styleDeclaration {Object}
         * @param durationMilliseconds {Number}
         * @param done {Function}
         * @return {void}
         */
        this.transition = function transition(element, styleDeclaration, durationMilliseconds, done) {

            var nativeElement    = this.resolveToNative(element),
                angularElement   = $angular.element(element),
                getDefaultStyles = this.getDefaultStyles;

            // Perform the animation using the fancy new `animate` method!
            var defaultStyles = getDefaultStyles(nativeElement, styleDeclaration),
                animation     = nativeElement.animate([defaultStyles, styleDeclaration], durationMilliseconds);

            /**
             * Invoked once the animation has completed.
             *
             * @method onFinish
             * @return {void}
             */
            animation.onfinish = function onFinish() {

                // Define the CSS so that it's not reverted by the native `animate` method.
                angularElement.css(styleDeclaration);
                done();

            };

        };

    };

    /**
     * @property prototype
     * @type {Animi}
     */
    Transition.prototype = new $window.Animi();

})(window, window.angular);