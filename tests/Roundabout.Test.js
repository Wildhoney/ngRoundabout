(function($angular) {

    beforeEach(module('ngRoundabout'));

    /**
     * @method compileDirective
     * @return {Object}
     */
    var compileDirective = function compileDirective() {

        var scope, html = '<div data-roundabout ng-model="collection"></div>';

        inject(function inject($rootScope, $compile) {

            scope = $rootScope.$new();
            $compile(html)(scope);

        });

        return scope.$$childHead;

    };

    /**
     * @method createElement
     * @return {angular.element}
     */
    var createElement = function createElement() {
        return $angular.element('<section />');
    };

    describe('Carousel', function() {

        it('It should be able to apply CSS styles to various elements;', inject(function(roundaboutOptions) {

            var scope = compileDirective();

            (function styleBaseElement() {

                // Style the base element?
                var baseElement       = createElement(),
                    styledBaseElement = scope.applyBaseElementStyles(baseElement);

                expect(styledBaseElement.css('width')).toEqual(roundaboutOptions.DIMENSION_WIDTH + 'px');
                expect(styledBaseElement.css('height')).toEqual(roundaboutOptions.DIMENSION_HEIGHT + 'px');
                expect(styledBaseElement.css('display')).toEqual('block');
                expect(styledBaseElement.css('position')).toEqual('relative');
                expect(styledBaseElement.css('perspective')).toEqual(roundaboutOptions.PERSPECTIVE + 'px');

            })();


        }));

    });

})(window.angular);