(function(){
  'use strict';

  angular.module('aha')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['Product'];
  function SidebarController(Product) {
    var ctrl = this;

    activate();
    return;
    //////////////////////

    function activate() {
      ctrl.categories = Product.categories;
    }

  }
})();
