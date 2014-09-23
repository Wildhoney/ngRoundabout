(function($angular) {

    /**
     * @controller PicturesController
     */
    $angular.module('roundaboutApp').controller('PicturesController',

    function PicturesController($scope, $http, carouselOptions) {

        /**
         * @property pictures
         * @type {Array}
         */
        $scope.pictures = [];

        // Dynamically retrieve all of the images.
        $http.get('imgur.json').then(function then(response) {
            $scope.pictures = response.data.splice(0, 20);
        });

        // Define the options for the carousel module.
        carouselOptions.FIGURE_PARTIAL_PATH   = 'partials/figure.html';
        carouselOptions.MAINTAIN_ASPECT_RATIO = true;
        carouselOptions.DIMENSION_HEIGHT      = 300;
        carouselOptions.BACKFACE_VISIBILITY   = 'visible';

    });

})(window.angular);