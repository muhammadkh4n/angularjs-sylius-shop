(function(){
  'use strict';

  angular.module('aha')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$state', '$rootScope', '$stateParams', 'product', 'Product', 'Cart', '$scope', 'Auth', 'Product', 'Profile'];
  function ProductController($state, $rootScope, $stateParams, product, ProductService, Cart, $scope, Auth, Product, Profile) {
    var ctrl = this;
    var category = {};
    ctrl.decQuantity = decQuantity;
    ctrl.incQuantity = incQuantity;
    ctrl.addItemToCart  = addItemToCart;
    ctrl.setActiveImage = setActiveImage;
    ctrl.getCode = getCode;
    ctrl.addToWishlist = addToWishlist;
    ctrl.loggedIn = Auth.loggedIn();

    activate();
    return;
    //////////////////////////////

    function activate() {
      $rootScope.$broadcast('loading-end');
      console.log('PRODUCT', product.data);
      ctrl.product = product.data;
      ctrl.enName = product.data.name;
      ctrl.enDesc = product.data.description;
      ctrl.translated = false;
      ctrl.activeImageIndex = 0;
      ctrl.activeImage = ctrl.product.images[0];
      ctrl.variantKeys = Object.keys(ctrl.product.variants);
      ctrl.variantCount = ctrl.variantKeys.length;
      ctrl.getTranslation = getTranslation;
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

    function getTranslation(productId) {
      if (ctrl.translated) {
        ctrl.product.name = ctrl.enName;
        ctrl.product.description = ctrl.enDesc;
        ctrl.translated = false;
        return;
      }
      Product.getProductDetailsTranslation(productId)
        .then(function(res) {
          ctrl.product.name = res.data.name;
          ctrl.product.description = res.data.description;
          ctrl.translated = true;
        })
        .catch(function(err) {
          console.log("TRANSLATE ERR", err);
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
      if (!Auth.loggedIn()) {
        $scope.msg = "Login to Add Items in your Cart";
        return;
      }
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

    function addToWishlist(variantCode) {
      var variant = {
        productVariantCode: variantCode
      };
      Profile.addToWishlist(variant)
        .then(function(res) {
          $scope.success = "Added to your wishlist";
          console.log(res.data);
        })
        .catch(function(err) {
          console.log("WISHLIST ADD ERR", err.data);
        });
    }

    function getCode(variants) {
      return Object.keys(variants)[0];
    }

  }
})();
