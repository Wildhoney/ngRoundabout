(function($angular) {

    beforeEach(module('ngRoundabout'));

    /**
     * @method compileDirective
     * @return {Object}
     */
    var compileDirective = function compileDirective() {

        var scope, html = '<div data-roundabout ng-model="collection"></div>';

        inject(function inject($rootScope, $compile, $httpBackend) {

            scope = $rootScope.$new();
            scope.collection = ['1.png', '2.png', '3.png'];
            $compile(html)($angular.extend(scope));

            // Mock the AJAX request for the partial.
            $httpBackend.when('GET', 'partials/roundabout.html').respond(200);
            $httpBackend.expect('GET', 'partials/roundabout.html').respond(200);

            $httpBackend.flush();
            $rootScope.$apply();

            expect(scope.collection.length).toEqual(3);
//            expect(scope.dimensionDegree).toEqual(120);

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

    describe('Roundabout', function() {

        it('Should be able to apply CSS styles to various elements;', inject(function(roundaboutOptions) {

            var scope = compileDirective();

            (function styleBaseElement() {

                // Style the base element?
                var baseElement       = createElement(),
                    styledBaseElement = scope.applyBaseElementStyles(baseElement);

                expect(styledBaseElement.css('width')).toEqual(roundaboutOptions.DIMENSION_WIDTH + 'px');
                expect(styledBaseElement.css('height')).toEqual(roundaboutOptions.DIMENSION_HEIGHT + 'px');
                expect(styledBaseElement.css('perspective')).toEqual(roundaboutOptions.PERSPECTIVE + 'px');

            })();

            (function styleContainerElement() {

                // Style the container element?
                roundaboutOptions.TRANSLATE_Z = 2500;
                var containerElement          = createElement(),
                    translateZ                = -4500,
                    styledContainerElement    = scope.applyContainerElementStyles(containerElement, translateZ);

                expect(styledContainerElement.css('transform')).toEqual('translateZ(' + roundaboutOptions.TRANSLATE_Z + 'px) rotateY(0deg)');

                // If the `roundaboutOptions.TRANSLATE_Z` is `NULL` then `translateZ` should take precedence.
                roundaboutOptions.TRANSLATE_Z = null;
                styledContainerElement = scope.applyContainerElementStyles(containerElement, translateZ);
                expect(styledContainerElement.css('transform')).toEqual('translateZ(' + translateZ + 'px) rotateY(0deg)');

            })();

            (function styleFigureElements() {

                /**
                 * @method figureExpect
                 * @param index {Number}
                 * @return {void}
                 */
                var figureExpect = function figureExpect(index) {

                    var figureElement  = scope.applyFigureElementStyles(index, true),
                        expectedDegree = (index * scope.dimensionDegree);

                    expect(figureElement.css('width')).toEqual('240px');
                    expect(figureElement.css('height')).toEqual('300px');
                    expect(figureElement.css('transform')).toEqual('rotateY(' + expectedDegree + 'deg) translateZ(72px)');
                    expect(figureElement.css('backfaceVisibility')).toEqual('hidden');

                };

                // Style the figure elements?
                figureExpect(0);
                figureExpect(1);
                figureExpect(2);

            })();

        }));

        it('Should be able to determine if the browser supports 3D transformations;', function() {
            expect(compileDirective().supports3DTransforms()).toBeTruthy();
        });

    });

})(window.angular);