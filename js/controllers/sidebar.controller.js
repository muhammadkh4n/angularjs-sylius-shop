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
      getCategories();
    }

    function getCategories() {
      Product.getTaxon('category')
        .then(function(res) {
          ctrl.categories = res.data.self.children;
        })
        .catch(function(err) {
          console.log(err.data);
        });
    }

  }
})();
