(function(){
  'use strict';

  angular.module('aha')
    .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['checkout'];
  function CheckoutController(checkout) {
    var ctrl = this;

    activate();
    return;

    function activate() {
      console.log("CHECKOUT", checkout.data);
    }
  }
})();
