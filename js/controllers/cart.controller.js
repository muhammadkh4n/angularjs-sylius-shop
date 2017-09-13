(function(){
  'use strict';

  angular.module('aha')
    .controller('CartController', CartController);

  CartController.$inject = ['Cart', '$rootScope', '$scope', '$stateParams'];
  function CartController(Cart, $rootScope, $scope, $stateParams) {
    var ctrl = this;

    activate();
    return;
    ///////////////////////////////

    function activate() {
      
    }
  }
})();
