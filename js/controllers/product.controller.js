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
    ctrl.setActiveImage = setActiveImage;

    activate();
    return;
    //////////////////////////////

    function activate() {
      $rootScope.$broadcast('loading-end');
      console.log('PRODUCT', product.data);
      ctrl.product = product.data;
      ctrl.activeImageIndex = 0;
      ctrl.activeImage = ctrl.product.images[0];
      ctrl.variantKeys = Object.keys(ctrl.product.variants);
      ctrl.variantCount = ctrl.variantKeys.length;
      $scope.item = {
        quantity: 1,
        productCode: ctrl.product.code
      };
      getCategory(product.data.taxons.main);
    }

    function setActiveImage(index) {
      ctrl.activeImageIndex = index;
      ctrl.activeImage = ctrl.product.images[index];
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
      if (ctrl.variantCount > 1 && !$scope.item.variantCode) {
        $scope.msg = "Select variant first";
        return;
      }
      $scope.msg = "";
      Cart.addCartItem($scope.item)
        .then(function(res) {
          $scope.success = "Added to cart";
          Cart.cart = res.data;
          $rootScope.$broadcast('added-to-cart');
          console.log(res.data);
        })
        .catch(function(err){
          console.log(err.data);
        });
    }
  }
})();
