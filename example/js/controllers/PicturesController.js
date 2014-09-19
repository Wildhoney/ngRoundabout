(function($angular) {

    /**
     * @controller PicturesController
     */
    $angular.module('carouselApp').controller('PicturesController',

    function PicturesController($scope, $http, carouselOptions) {

        /**
         * @method removeOneSet
         * @return {void}
         */
        $scope.removeOneSet = function removeOneSet() {
            $scope.pictures.splice(0, 1);
        };

        /**
         * @property pictures
         * @type {Array}
         */
        $scope.pictures = [];

        // Dynamically retrieve all of the images.
        $http.get('pictures.json').then(function then(response) {
            $scope.pictures = response.data;
        });

        // Define the options for the carousel module.
        carouselOptions.FIGURE_PARTIAL_PATH   = 'partials/figure.html';
        carouselOptions.MAINTAIN_ASPECT_RATIO = true;
        carouselOptions.DIMENSION_HEIGHT      = 300;

    });

})(window.angular);