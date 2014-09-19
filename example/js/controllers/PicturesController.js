(function($angular) {

    /**
     * @controller PicturesController
     */
    $angular.module('carouselApp').controller('PicturesController', function PicturesController($scope) {

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
        $scope.pictures = [
            [
                { picture: 'images/AANKEN.jpg' },
                { picture: 'images/ABACO.jpg' },
                { picture: 'images/ALEXGOR.jpg' }
            ],
            [
                { picture: 'images/BUSHLL.jpg' },
                { picture: 'images/CHARDNH.jpg' },
                { picture: 'images/CHPTON.jpg' }
            ],
            [
                { picture: 'images/CHSFNKL.jpg' },
                { picture: 'images/CLUSJWL.jpg' },
                { picture: 'images/COPSURV.jpg' }
            ],
            [
                { picture: 'images/CORNRELO.jpg' },
                { picture: 'images/COUNWALES.jpg' },
                { picture: 'images/CROFTI.jpg' }
            ],
            [
                { picture: 'images/DAYNTN.jpg' },
                { picture: 'images/DNGFUL.jpg' },
                { picture: 'images/DOWHAL.jpg' }
            ],
            [
                { picture: 'images/DREWBASIN.jpg' },
                { picture: 'images/DTZRES.jpg' },
                { picture: 'images/FETKING.jpg' }
            ],
            [
                { picture: 'images/FIRSTUNI.jpg' },
                { picture: 'images/FITZMAY.jpg' },
                { picture: 'images/FR0GRMB.jpg' }
            ],
            [
                { picture: 'images/FR0VSP2.jpg' },
                { picture: 'images/FRNDFA.jpg' },
                { picture: 'images/FSBRKGN.jpg' }
            ],
            [
                { picture: 'images/GOLHOW.jpg' },
                { picture: 'images/GRANVI.jpg' },
                { picture: 'images/GREENBA.jpg' }
            ],
            [
                { picture: 'images/GRTNWM.jpg' },
                { picture: 'images/HAMTBL.jpg' },
                { picture: 'images/HANDH.jpg' }
            ],
            [
                { picture: 'images/HARLAT.jpg' },
                { picture: 'images/HOWESTS.jpg' },
                { picture: 'images/JACKEN.jpg' }
            ],
            [
                { picture: 'images/JACKJACK.jpg' },
                { picture: 'images/JAKMAY.jpg' },
                { picture: 'images/JDWBAT.jpg' }
            ],
            [
                { picture: 'images/KFHCHIS.jpg' },
                { picture: 'images/KFWEST.jpg' },
                { picture: 'images/LANEFUL.jpg' }
            ],
            [
                { picture: 'images/LREALL.jpg' },
                { picture: 'images/LSHLSH.jpg' },
                { picture: 'images/LSVLSV.jpg' }
            ],
            [
                { picture: 'images/MACAR.jpg' },
                { picture: 'images/MAYCA.jpg' },
                { picture: 'images/MAYNCO.jpg' }
            ],
            [
                { picture: 'images/MCMAHN.jpg' },
                { picture: 'images/MOUNTHL.jpg' },
                { picture: 'images/MYPAD.jpg' }
            ],
            [
                { picture: 'images/NBNYPC.jpg' },
                { picture: 'images/PARKHIGH.jpg' },
                { picture: 'images/PEMBERT.jpg' }
            ],
            [
                { picture: 'images/PETERJ.jpg' },
                { picture: 'images/PETERWB.jpg' },
                { picture: 'images/PLAKNIL.jpg' }
            ],
            [
                { picture: 'images/PRICEP.jpg' },
                { picture: 'images/PROPDIVA.jpg' },
                { picture: 'images/RENREN.jpg' }
            ],
            [
                { picture: 'images/ROXBURY.jpg' },
                { picture: 'images/RUBILIME.jpg' },
                { picture: 'images/SACKROY.jpg' }
            ],
            [
                { picture: 'images/SANFDS.jpg' },
                { picture: 'images/SAVCIREN.jpg' },
                { picture: 'images/SPLBRN.jpg' }
            ],
            [
                { picture: 'images/STURGE.jpg' },
                { picture: 'images/SULTHW.jpg' },
                { picture: 'images/VANHAN.jpg' }
            ],
            [
                { picture: 'images/VBAT.jpg' },
                { picture: 'images/VILLPRO.jpg' },
                { picture: 'images/WELLIN.jpg' }
            ],
            [
                { picture: 'images/WILVAL.jpg' },
                { picture: 'images/WINFULL.jpg' }
            ]
        ];

    });

})(window.angular);