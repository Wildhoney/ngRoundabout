(function($window) {

    // Mock Modernizr.
    $window.Modernizr = {

        /**
         * @method testAllProps
         * @return {Boolean}
         */
        testAllProps: function testAllProps() {
            return true;
        },

        /**
         * @method addTest
         * @param property {String}
         * @param result {Boolean}
         * @return {void}
         */
        addTest: function addTest(property, result) {
            this[property] = result;
        }

    };

})(window);