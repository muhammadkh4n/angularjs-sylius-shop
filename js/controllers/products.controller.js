(function(){
  'use strict';

  angular.module('aha')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['Auth', '$scope', '$rootScope', '$state', '$stateParams', 'products', 'category', 'Profile'];
  function ProductsController(Auth, $scope, $rootScope, $state, $stateParams, products, category, Profile) {
    var ctrl = this;
    ctrl.show = false;
    ctrl.noCategory = $state.current.name !== 'productsBySlug' ? true : false;
    ctrl.expand = expand;
    ctrl.switchState = switchState;
    ctrl.getCode = getCode;
    ctrl.addToWishlist = addToWishlist;
    ctrl.loggedIn = Auth.loggedIn();

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
      } else {
        console.log('ERROR', products, category);
      }
    }

    function addToWishlist(variantCode, index) {
      var variant = {
        productVariantCode: variantCode
      };
      Profile.addToWishlist(variant)
        .then(function(res) {
          console.log(res.data);
          ctrl.success = index;
        })
        .catch(function(err) {
          console.log("WISHLIST ADD ERR", err.data);
        });
    }

    function expand(e) {
      $(e.target).next(".list-child").toggleClass("show");
    }

    function switchState(slug, page, limit) {
      $state.go($state.current.name, {slug: slug, page: page, limit: limit});
    }

    function getCode(variants) {
      return Object.keys(variants)[0];
    }

  }
})();
