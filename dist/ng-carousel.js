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

        DIMENSION_WIDTH: 250,
        DIMENSION_HEIGHT: 300,
        DIMENSION_SPACING: 10,
        PERSPECTIVE: 1000,
        BACKFACE_VISIBILITY: 'hidden',
        MAINTAIN_WIDTH: true,
        GROUP_PICTURES_BY: 3

    });
    
    /**
     * @directive Carousel
     */
    app.directive('carousel', function CarouselDirective(carouselOptions) {

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
             * @property scope
             * @type {Object}
             */
            scope: {
                pictures: '=ngModel'
            },

            /**
             * @method controller
             * @return {void}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @property originalWidth
                 * @type {Number|null}
                 */
                $scope.originalWidth = null;

                /**
                 * @property originalDimension
                 * @type {Number|null}
                 */
                $scope.originalDimension = null;

                /**
                 * @method applyCarouselStyles
                 * @param carouselElement {angular.element}
                 * @return {void}
                 */
                $scope.applyCarouselStyles = function applyCarouselStyles(carouselElement) {

                    console.log($scope.originalDimension);

                    carouselElement.css({
                        width: $scope.originalDimension + 'px',
                        height: carouselOptions.DIMENSION_HEIGHT + 'px',
                        position: 'relative',
                        perspective: carouselOptions.PERSPECTIVE + 'px',
                        display: 'block'
                    });

                };

                /**
                 * @method appendData
                 * @param figureElement {angular.element}
                 * @param model {Array|Object|String}
                 * @return {void}
                 */
                $scope.appendData = function appendData(figureElement, model) {
                    
                    if ($angular.isArray(model) && model[0].picture) {
                        $scope.addPictureModels(figureElement, model);
                        return;
                    }

                    $scope.addPicture(figureElement, model);

                };

                /**
                 * Responsible for adding a simple picture source to the figure element.
                 *
                 * @method addPicture
                 * @param figureElement {angular.element}
                 * @param picture {String}
                 * @return {void}
                 */
                $scope.addPicture = function addPicture(figureElement, picture) {

                    figureElement.css({
                        backgroundImage: 'url("' + picture + '")',
                        backgroundRepeat: 'no-repeat'
                    });

                };

                /**
                 * Responsible for adding an array of pictures which are represented as models, potentially
                 * having a textual caption as well.
                 *
                 * @method addPictureModels
                 * @param figureElement {angular.element}
                 * @param pictureModels {Array}
                 * @return {void}
                 */
                $scope.addPictureModels = function addPictureModels(figureElement, pictureModels) {

                    $angular.forEach(pictureModels, function forEach(pictureModel) {

                        var divElement = $angular.element('<div />');

                        divElement.css({
                            backgroundImage: 'url("' + pictureModel.picture + '")',
                            backgroundRepeat: 'no-repeat'
                        });

                        figureElement.append(divElement);

                    });

                };

                /**
                 * @method createTransformElement
                 * @param baseElement {angular.element}
                 * @param translateZ {Number}
                 * @return {angular.element}
                 */
                $scope.createTransformElement = function createTransformElement(baseElement, translateZ) {

                    var carousel = baseElement.find('section');

                    if (carousel.length === 0) {

                        // Append node that will handle the `transform-style`.
                        carousel = $angular.element('<section />');
                        baseElement.append(carousel);

                        carousel.css({
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            transformStyle: 'preserve-3d',
                            transform: 'translateZ(-' + translateZ + 'px) rotateY(0deg)'
                        });

                    }

                    return carousel;

                };

                /**
                 * @method addFigureElement
                 * @param baseElement {angular.element}
                 * @param degree {Number}
                 * @param translateZ {Number}
                 * @return {angular.element}
                 */
                $scope.addFigureElement = function addFigureElement(baseElement, degree, translateZ) {

                    // Render the HTML for the carousel if it hasn't been rendered already.
                    var transformElement = $scope.createTransformElement(baseElement, translateZ),
                        figureElement    = $angular.element('<figure />');

                    transformElement.append(figureElement);

                    figureElement.css({
                        display: 'block',
                        position: 'absolute',
                        width: (carouselOptions.DIMENSION_WIDTH - carouselOptions.DIMENSION_SPACING) + 'px',
//                        width: (carouselOptions.DIMENSION_WIDTH) + 'px',
//                        width: '100%',
                        height: carouselOptions.DIMENSION_HEIGHT + 'px',
                        backfaceVisibility: carouselOptions.BACKFACE_VISIBILITY,
                        transform: 'rotateY(' + degree + 'deg) translateZ(' + translateZ + 'px)'
                    });
                    
                    return figureElement;

                };

                /**
                 * @method removeFigureElements
                 * @param baseElement {angular.element}
                 * @return {void}
                 */
                $scope.removeFigureElements = function removeFigureElements(baseElement) {
                    baseElement.find('figure').remove();
                };

            }],

            /**
             * @method link
             * @param scope {Object}
             * @param carouselElement {angular.element}
             * @return {void}
             */
            link: function link(scope, carouselElement) {

                scope.$watch('pictures', function modelUpdated() {

                    var dimensionCount  = scope.pictures.length,
                        dimensionDegree = 360 / dimensionCount;

                    if (scope.originalWidth === null) {

                        // For maintaining the width we must save the original width of the carousel.
                        scope.originalWidth = carouselOptions.DIMENSION_WIDTH * dimensionCount;

                    }

                    if (scope.originalDimension === null) {

                        // Also memorise the original dimension size.
                        scope.originalDimension = carouselOptions.DIMENSION_WIDTH;

                    }

                    scope.removeFigureElements(carouselElement);
                    scope.applyCarouselStyles(carouselElement);

                    if (carouselOptions.MAINTAIN_WIDTH) {

                        // If we're maintaining the width then we need to calculate the new width for each
                        // dimension based on the count of the dimensions.
                        carouselOptions.DIMENSION_WIDTH = scope.originalWidth / dimensionCount;

                        carouselElement.find('section').css({
                            left: '-' + ((carouselOptions.DIMENSION_WIDTH - scope.originalDimension) / 2) + 'px'
                        });

                    }

                    var currentDegree = 0,
                        translateZ    = $math.round((carouselOptions.DIMENSION_WIDTH / 2) / $math.tan($math.PI / dimensionCount));

                    for (var index = 0; index < dimensionCount; index++) {

                        // Add the figure element to the carousel with its unique degree.
                        var figureElement = scope.addFigureElement(carouselElement, currentDegree += dimensionDegree, translateZ);
                        scope.appendData(figureElement, scope.pictures[index]);

                    }

                }, true);

            }

        };

    });

})(window.Math, window.angular);