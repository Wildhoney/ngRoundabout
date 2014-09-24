/**
 * @param $angular {window.angular}
 * @param $math {window.Math}
 * @param $modernize {window.Modernizr}
 */
(function ngRoundabout($angular, $math, $modernizr) {

    "use strict";

    /**
     * @module ngRoundabout
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ngRoundabout
     */
    var app = $angular.module('ngRoundabout', []).run(function run() {

        if ($angular.isDefined($modernizr)) {

            // Add test for "preserve-3d" transform style.
            $modernizr.addTest('preserve3d', $modernizr.testAllProps('transformStyle', 'preserve-3d'));

        }

    });

    /**
     * @constant roundaboutOptions
     * @type {Object}
     */
    app.constant('roundaboutOptions', {

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
         * @property TRANSLATE_Z
         * @type {Number|null}
         */
        TRANSLATE_Z: -2000,

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
        FIGURE_PARTIAL_PATH: 'partials/roundabout.html'

    });
    
    /**
     * @directive Roundabout
     */
    app.directive('roundabout', ['$window', 'roundaboutOptions', function RoundaboutDirective($window, roundaboutOptions) {

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
            template: '<section class="roundabout-container"><figure ng-repeat="model in collection" ng-include="partial">{{applyFigureElementStyles($index)}}</figure></section>',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                collection: '=ngModel',
                dimension: '=dimension'
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
                $scope.partial = roundaboutOptions.FIGURE_PARTIAL_PATH;

                /**
                 * @method applyBaseElementStyles
                 * @param baseElement {angular.element}
                 * @return {angular.element}
                 */
                $scope.applyBaseElementStyles = function applyBaseElementStyles(baseElement) {

                    return baseElement.css({
                        width: roundaboutOptions.DIMENSION_WIDTH + 'px',
                        height: roundaboutOptions.DIMENSION_HEIGHT + 'px',
                        display: 'block',
                        position: 'relative',
                        perspective: roundaboutOptions.PERSPECTIVE + 'px'
                    });

                };

                /**
                 * @method applyContainerElementStyles
                 * @param containerElement {angular.element}
                 * @param translateZ {Number}
                 * @return {angular.element}
                 */
                $scope.applyContainerElementStyles = function applyContainerElementStyles(containerElement, translateZ) {

                    translateZ = (roundaboutOptions.TRANSLATE_Z !== null) ? roundaboutOptions.TRANSLATE_Z : translateZ;

                    return containerElement.css({
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        transform: 'translateZ(' + translateZ + 'px) rotateY(0deg)',
                        transformStyle: 'preserve-3d'
                    });

                };

                /**
                 * @method applyFigureElementStyles
                 * @param index {Number}
                 * @param [returnElement=false] {Boolean}
                 * @return {angular.element|void}
                 */
                $scope.applyFigureElementStyles = function applyFigureElementStyles(index, returnElement) {

                    returnElement = !!returnElement || false;

                    var figureElement = $angular.element($scope.baseElement.find('figure')[index]),
                        degree        = ($scope.dimensionDegree * index);

                    figureElement.css({
                        width: ($scope.currentDimensionWidth - roundaboutOptions.DIMENSION_SPACING) + 'px',
                        height: roundaboutOptions.DIMENSION_HEIGHT + 'px',
                        display: 'block',
                        position: 'absolute',
                        transform: 'rotateY(' + degree + 'deg) translateZ(' + $scope.translateZ + 'px)',
                        backfaceVisibility: roundaboutOptions.BACKFACE_VISIBILITY
                    });

                    if (returnElement) {
                        return figureElement;
                    }

                };

                /**
                 * @method supports3DTransforms
                 * @return {Boolean|null}
                 */
                $scope.supports3DTransforms = function supports3DTransforms() {
                    return $angular.isDefined($modernizr) ? $modernizr.preserve3d : null;
                };

                /**
                 * @method applyBaseElementOffset
                 * @param containerElement {angular.element}
                 * @return {void}
                 */
                $scope.applyContainerElementOffset = function applyContainerElementOffset(containerElement) {

                    containerElement.css({
                        left: '-' + (($scope.currentDimensionWidth - roundaboutOptions.DIMENSION_WIDTH) / 2) + 'px'
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

                // Memorise the original values for maintaining the roundabout's width, if the developer
                // chooses this option.
                scope.currentDimensionWidth = roundaboutOptions.DIMENSION_WIDTH;

                scope.$watch('dimension', function dimensionChanged() {

                    // Calculate at which angle the desired dimension is.
                    var angle = scope.dimensionDegree * scope.dimension;

                    if ($angular.isNumber(angle)) {

                        // Apply the translateZ property since it's been defined.
                        var containerElement = $angular.element(baseElement.find('section')[0]),
                            translateZ       = (roundaboutOptions.TRANSLATE_Z !== null) ? roundaboutOptions.TRANSLATE_Z : 0;

                        containerElement.css({
                            transform: 'translateZ(' + translateZ + 'px) rotateY(' + angle + 'deg)'
                        });

                    }

                });

                scope.$watchCollection('collection', function collectionChanged() {

                    if (scope.collection.length === 0) {
                        return;
                    }

                    var containerElement = $angular.element(baseElement.find('section')[0]),
                        dimensionCount   = scope.collection.length,
                        dimensionDegree  = 360 / dimensionCount,
                        radius           = (roundaboutOptions.DIMENSION_WIDTH / 2),
                        translateZ       = $math.round(radius / $math.tan($math.PI / dimensionCount));

                    scope.translateZ      = translateZ;
                    scope.baseElement     = baseElement;
                    scope.dimensionDegree = dimensionDegree;

                    if (!scope.memorisedOptions) {

                        // Memorise the original length of the items in the roundabout, as well as the original
                        // Z axis value.
                        scope.originalCount      = scope.collection.length;
                        scope.originalTranslateZ = translateZ;
                        scope.memorisedOptions   = true;

                    }

                    // Apply the styles for the base and container elements.
                    scope.applyBaseElementStyles(baseElement);
                    scope.applyContainerElementStyles(containerElement, translateZ);

                    if (roundaboutOptions.MAINTAIN_ASPECT_RATIO) {

                        // If we're maintaining the width then we need to calculate the new width for each
                        // dimension based on the count of the dimensions.
                        scope.translateZ            = scope.originalTranslateZ;
                        scope.currentDimensionWidth = (roundaboutOptions.DIMENSION_WIDTH * scope.originalCount) / dimensionCount;
                        scope.applyContainerElementOffset(containerElement);

                    }

                });

            }

        };

    }]);

})(window.angular, window.Math, window.Modernizr);