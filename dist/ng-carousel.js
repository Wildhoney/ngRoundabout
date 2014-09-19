(function ngCarousel($math, $angular) {

    "use strict";

    /**
     * @module ngCarousel
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ngCarousel
     */
    var app = $angular.module('ngCarousel', []);

    /**
     * @constant carouselOptions
     */
    app.constant('carouselOptions', {

        /**
         * @constant DIMENSION_WIDTH
         * @type {Number}
         */
        DIMENSION_WIDTH: 250,

        /**
         * @constant DIMENSION_HEIGHT
         * @type {Number}
         */
        DIMENSION_HEIGHT: 300,

        /**
         * @constant DIMENSION_SPACING
         * @type {Number}
         */
        DIMENSION_SPACING: 10,

        /**
         * @constant PERSPECTIVE
         * @type {Number}
         */
        PERSPECTIVE: 1000,

        /**
         * @constant BACKFACE_VISIBILITY
         * @type {String}
         */
        BACKFACE_VISIBILITY: 'hidden',

        /**
         * Determines whether we should maintain the original aspect ratio when items are added
         * and removed.
         *
         * @constant MAINTAIN_ASPECT_RATIO
         * @type {Boolean}
         */
        MAINTAIN_ASPECT_RATIO: false,

        /**
         * Determines the path of the partial to be loaded for the figure element.
         *
         * @constant FIGURE_PARTIAL_PATH
         * @type {String}
         */
        FIGURE_PARTIAL_PATH: 'figure.html'

    });
    
    /**
     * @directive Carousel
     */
    app.directive('carousel', ['carouselOptions', function CarouselDirective(carouselOptions) {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @property require
             * @type {String}
             */
            require: 'ngModel',

            /**
             * @property template
             * @type {String}
             */
            template: '<section class="carousel-container"><figure ng-repeat="model in collection" ng-include="partial">{{applyFigureElementStyles($index)}}</figure></section>',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                collection: '=ngModel'
            },

            /**
             * @method controller
             * @return {void}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @property currentDimensionWidth
                 * @type {Number}
                 */
                $scope.currentDimensionWidth = 0;

                /**
                 * Denotes whether we have memorised the original options, which relates to the maintaining
                 * of the aspect ratio.
                 *
                 * @property memorisedOptions
                 * @type {Boolean}
                 */
                $scope.memorisedOptions = false;

                /**
                 * @property originalCount
                 * @type {Number}
                 */
                $scope.originalCount = 0;

                /**
                 * @property partial
                 * @type {String}
                 */
                $scope.partial = carouselOptions.FIGURE_PARTIAL_PATH;

                /**
                 * @method applyBaseElementStyles
                 * @param baseElement {angular.element}
                 * @return {void}
                 */
                $scope.applyBaseElementStyles = function applyBaseElementStyles(baseElement) {

                    baseElement.css({
                        width: carouselOptions.DIMENSION_WIDTH + 'px',
                        height: carouselOptions.DIMENSION_HEIGHT + 'px',
                        position: 'absolute',
                        perspective: carouselOptions.PERSPECTIVE + 'px',
                        display: 'block'
                    });

                };

                /**
                 * @method applyContainerElementStyles
                 * @param containerElement {angular.element}
                 * @param translateZ {Number}
                 * @return {void}
                 */
                $scope.applyContainerElementStyles = function applyContainerElementStyles(containerElement, translateZ) {

                    containerElement.css({
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(-' + translateZ + 'px) rotateY(0deg)'
                    });

                };

                /**
                 * @method applyFigureElementStyles
                 * @param index {Number}
                 * @return {void}
                 */
                $scope.applyFigureElementStyles = function applyFigureElementStyles(index) {

                    var figureElement = $angular.element($scope.baseElement.find('figure')[index]),
                        degree        = ($scope.dimensionDegree * index);

                    figureElement.css({
                        display: 'block',
                        position: 'absolute',
                        width: ($scope.currentDimensionWidth - carouselOptions.DIMENSION_SPACING) + 'px',
                        height: carouselOptions.DIMENSION_HEIGHT + 'px',
                        backfaceVisibility: carouselOptions.BACKFACE_VISIBILITY,
                        transform: 'rotateY(' + degree + 'deg) translateZ(' + $scope.translateZ + 'px)'
                    });

                };

                /**
                 * @method applyBaseElementOffset
                 * @param containerElement {angular.element}
                 * @return {void}
                 */
                $scope.applyContainerElementOffset = function applyContainerElementOffset(containerElement) {

                    containerElement.css({
                        left: '-' + (($scope.currentDimensionWidth - carouselOptions.DIMENSION_WIDTH) / 2) + 'px'
                    });

                };

            }],

            /**
             * @method link
             * @param scope {Object}
             * @param baseElement {angular.element}
             * @return {void}
             */
            link: function link(scope, baseElement) {

                // Memorise the original values for maintaining the carousel's width, if the developer
                // chooses this options.
                scope.currentDimensionWidth = carouselOptions.DIMENSION_WIDTH;

                scope.$watch('collection', function collectionChanged() {

                    if (scope.collection.length === 0) {
                        return;
                    }

                    var containerElement = $angular.element(baseElement.find('section')[0]),
                        dimensionCount   = scope.collection.length,
                        dimensionDegree  = 360 / dimensionCount,
                        radius           = (carouselOptions.DIMENSION_WIDTH / 2),
                        translateZ       = $math.round(radius / $math.tan($math.PI / dimensionCount));

                    scope.baseElement     = baseElement;
                    scope.dimensionDegree = dimensionDegree;
                    scope.translateZ      = translateZ;

                    if (!scope.memorisedOptions) {

                        // Memorise the original length of the items in the carousel, as well as the original
                        // Z axis value.
                        scope.originalCount      = scope.collection.length;
                        scope.originalTranslateZ = translateZ;
                        scope.memorisedOptions   = true;

                    }

                    // Apply the styles for the base and container elements.
                    scope.applyBaseElementStyles(baseElement);
                    scope.applyContainerElementStyles(containerElement, translateZ);

                    if (carouselOptions.MAINTAIN_ASPECT_RATIO) {

                        // If we're maintaining the width then we need to calculate the new width for each
                        // dimension based on the count of the dimensions.
                        scope.currentDimensionWidth = (carouselOptions.DIMENSION_WIDTH * scope.originalCount) / dimensionCount;
                        scope.translateZ   = scope.originalTranslateZ;
                        scope.applyContainerElementOffset(containerElement);

                    }

                }, true);

            }

        };

    }]);

})(window.Math, window.angular);