(function($angular) {

    /**
     * @controller PicturesController
     */
    $angular.module('roundaboutApp').controller('PicturesController',

    function PicturesController($scope, $http, roundaboutOptions) {

        /**
         * @property pictures
         * @type {Array}
         */
        $scope.pictures = [];

        /**
         * @property dimension
         * @type {Number}
         */
        $scope.dimension = 0;

        /**
         * @method nextDimension
         * @return {void}
         */
        $scope.nextDimension = function nextDimension() {
            $scope.dimension++;
        };

        // Dynamically retrieve all of the images.
        $http.get('imgur.json').then(function then(response) {
            $scope.pictures = response.data.splice(0, 20);
        });

        // Define the options for the roundabout module.
        roundaboutOptions.FIGURE_PARTIAL_PATH   = 'partials/figure.html';
        roundaboutOptions.MAINTAIN_ASPECT_RATIO = true;
        roundaboutOptions.DIMENSION_HEIGHT      = 300;
        roundaboutOptions.BACKFACE_VISIBILITY   = 'visible';

    });

})(window.angular);