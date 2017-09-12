(function(){
  'use strict';

  angular.module('aha')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$state', '$rootScope', '$stateParams', 'product', 'Product'];
  function ProductController($state, $rootScope, $stateParams, product, ProductService) {
    var ctrl = this;
    var category = {};

    activate();
    return;
    //////////////////////////////

    function activate() {
      $rootScope.$broadcast('loading-end');
      console.log('PRODUCT', product.data);
      ctrl.product = product.data;
      getCategory(product.data.taxons.main);
    }

    function getCategory(slug) {
      ProductService.getTaxon(slug)
        .then(function(res){
          console.log('CATEGORY', res.data);
          ctrl.category = res.data;
        })
        .catch(function(err){
          console.log(err.data);
        });
    }
  }
})();
