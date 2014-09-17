(function ngCarousel($math, $angular) {

    "use strict";

    /**
     * @module ngCarousel
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ngCarousel
     */
    var app = $angular.module('ngCarousel', []);

    /**
     * @directive Carousel
     */
    app.directive('carousel', function CarouselDirective() {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @method controller
             * @return {void}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @method createTransform
                 * @param baseElement {angular.element}
                 * @return {angular.element}
                 */
                $scope.createTransform = function createTransform(baseElement) {

                    var carousel = baseElement.find('section');

                    if (carousel.length === 0) {

                        // Append node that will handle the `transform-style`.
                        carousel = $angular.element('<section />');
                        baseElement.append(carousel);

                    }

                    return carousel;

                };

                /**
                 * @method addFigure
                 * @param baseElement {angular.element}
                 * @param degree {Number}
                 * @param translateZ {Number}
                 * @return {void}
                 */
                $scope.addFigure = function addFigure(baseElement, degree, translateZ) {

                    // Render the HTML for the carousel if it hasn't been rendered already.
                    var transformElement = $scope.createTransform(baseElement),
                        figureElement    = $angular.element('<figure />');

                    transformElement.append(figureElement);

                    // Define the degree for the FIGURE according to its position in the array.
                    figureElement[0].style.transform = 'rotateY(' + degree + 'deg) translateZ(' + translateZ + 'px)';

                };

            }],

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                var dimensionCount  = 8,
                    dimensionDegree = 360 / dimensionCount,
                    translateZ      = $math.round((210 / 2) / $math.tan($math.PI / dimensionCount));

                console.log(dimensionDegree);

                for (var degree = dimensionDegree; degree <= 360; degree += dimensionDegree) {

                    scope.addFigure(element, degree, translateZ);
                    
                }

            }

        };

    });

})(window.Math, window.angular);