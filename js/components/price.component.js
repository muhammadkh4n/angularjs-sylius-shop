(function(){
  'use strict';

  angular.module('aha')
    .component('price', {
      bindings: {
        discount: '@',
        price: '@',
        variants: '<',
        variantCode: '<'
      },
      templateUrl: 'templates/price.component.html',
      controller: PriceComponentCtrl
    });

  PriceComponentCtrl.$inject = [];
  function PriceComponentCtrl() {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.variant = setVariant($ctrl.variants, $ctrl.variantCode);
      $ctrl.isPrice = $ctrl.price !== undefined;
      $ctrl.isDiscount = $ctrl.discount !== undefined;
    };

    activate();
    return;
    ///////////////////////

    function activate() {
    }

    function setVariant(variants, variantCode) {
      if (variants && !variantCode) {
        return variants[Object.keys(variants)[0]];
      } else if (variants && variantCode) {
        return variants[variantCode];
      }
      return null;
    }
  }
})();