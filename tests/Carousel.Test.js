(function($angular) {

    beforeEach(module('ngRoundabout'));

    /**
     * @method compileDirective
     * @return {Object}
     */
    var compileDirective = function compileDirective() {

        var scope, html = '<div data-carousel ng-model="collection"></div>';

        inject(function inject($rootScope, $compile) {;

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

        it('It should be able to apply CSS styles to various elements;', inject(function(carouselOptions) {

            var scope = compileDirective();

            (function styleBaseElement() {

                // Style the base element?
                var baseElement       = createElement(),
                    styledBaseElement = scope.applyBaseElementStyles(baseElement);

                expect(styledBaseElement.css('width')).toEqual(carouselOptions.DIMENSION_WIDTH + 'px');
                expect(styledBaseElement.css('height')).toEqual(carouselOptions.DIMENSION_HEIGHT + 'px');
                expect(styledBaseElement.css('display')).toEqual('block');
                expect(styledBaseElement.css('position')).toEqual('relative');
                expect(styledBaseElement.css('perspective')).toEqual(carouselOptions.PERSPECTIVE + 'px');

            })();


        }));

    });

})(window.angular);