(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name pdr.widgets.ModalTemplateModalController
     * @requires
     * @description
     *
     * A description of the controller, service or filter
     *
     * @example
     *
     * //Remember to inject the service ---> $modal
     *
         var modalInstance = $modal.open({
             'templateUrl' : './public/app/widgets/modals/modal-template-modal/modal-template-modal.cache.html',
             'controller' : 'ModalTemplateModalController as vm',
             'resolve' : {
                 'DependencyInjection' : function () {
                    return 'ModalTemplate';
                 }
             }
         });

        return modalInstance.result;

        //Or

        modalInstance.result.then(function (modalResult) {
            console.log(modalResult);
        });
     *
     */
    angular
        .module('pdr.widgets')
        .controller('ModalTemplateModalController', ModalTemplateModalController);

    ModalTemplateModalController.$inject = ['$modalInstance', 'ModalTemplateModalProvider', 'DependencyInjection'];

    /* @ngInject */
    function ModalTemplateModalController($modalInstance, ModalTemplateModalProvider,  DependencyInjection) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = DependencyInjection;
        vm.modalTemplateForm;
        vm.cancel = cancelModal;
        vm.submit = submitModal;

        activate();

        ////////////////

        /**
         * @ngdoc method
         * @name activate
         * @methodOf pdr.widgets.ModalTemplateModalController
         * @returns {void} Runs the functions needed when the controller is active
         */
        function activate() {

        }

        /********************
         * Public Methods
         ********************/

        /**
         * @ngdoc method
         * @name cancelModal
         * @methodOf pdr.widgets.ModalTemplateModalProvider
         * @returns {void} Runs the functions needed to cancel the modal
         */
        function cancelModal(){
            $modalInstance.dismiss('cancel');
        }

        /**
         * @ngdoc method
         * @name submitModal
         * @methodOf pdr.widgets.ModalTemplateModalController
         * @returns {void} Runs the functions needed to submit the modal
         */
        function submitModal(){
            if ( vm.modalTemplateForm.$valid ) {
                $modalInstance.close({
                    "title": vm.title
                });
            }
        }

        /********************
         * Private Methods
         ********************/

    }
})();