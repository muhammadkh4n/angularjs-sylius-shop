(function(){
  'use strict';

  angular.module('aha')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['Auth', '$scope', '$rootScope', '$state', '$stateParams', 'products', 'category'];
  function ProductsController(Auth, $scope, $rootScope, $state, $stateParams, products, category) {
    var ctrl = this;
    ctrl.cropImage = cropImage;
    ctrl.show = false;
    ctrl.isSearch = $stateParams.imageId ? true : false;
    ctrl.imageId = $stateParams.imageId;
    ctrl.expand = expand;
    
    activate();
    return;
    ////////////////////

    function activate() {
      $rootScope.$broadcast('loading-end');
      if (products.status === 200) {
        console.log('PRODUCTS', products.data);
        console.log('CATEGORY', category.data)
        ctrl.products = products.data;
        ctrl.slug = $stateParams.slug;
        ctrl.category = category.data;
        ctrl.image = '';
      } else {
        console.log('ERROR', products, category);
      }
    }

    function expand(e) {
      $(e.target).next(".list-child").toggleClass("show");
    }
    
    function cropImage(image) {
      ctrl.image = image;
      $scope.show = true;
    }

  }
})();
