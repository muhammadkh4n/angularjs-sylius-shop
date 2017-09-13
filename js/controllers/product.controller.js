(function(){
  'use strict';

  angular.module('aha')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$state', '$rootScope', '$stateParams', 'product', 'Product', 'Cart', '$scope'];
  function ProductController($state, $rootScope, $stateParams, product, ProductService, Cart, $scope) {
    var ctrl = this;
    var category = {};
    ctrl.decQuantity = decQuantity;
    ctrl.incQuantity = incQuantity;
    ctrl.addItemToCart  = addItemToCart;

    activate();
    return;
    //////////////////////////////

    function activate() {
      $rootScope.$broadcast('loading-end');
      console.log('PRODUCT', product.data);
      ctrl.product = product.data;
      $scope.item = {
        quantity: 1,
        productCode: ctrl.product.code
      };
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

    function decQuantity() {
      if ($scope.item.quantity <= 1) return;
      $scope.item.quantity--;
    }

    function incQuantity() {
      $scope.item.quantity++;
    }
    
    function addItemToCart() {
      if (!$scope.item.variantCode) {
        $scope.msg = "Select variant first";
        return;
      }
      $scope.msg = "";
      Cart.addCartItem($scope.item)
        .then(function(res) {
          $scope.success = "Added to cart";
          console.log(res.data);
        })
        .catch(function(err){
          console.log(err.data);
        });
    }
  }
})();
