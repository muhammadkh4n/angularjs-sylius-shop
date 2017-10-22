(function(){
  'use strict';

  angular.module('aha')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['recommended', 'Profile', 'Auth'];
  function HomeController(recommended, Profile, Auth) {
    var ctrl = this;
    ctrl.getCode = getCode;
    ctrl.addToWishlist = addToWishlist;
    ctrl.loggedIn = Auth.loggedIn();

    activate();
    return;
    ///////////////////////////////////

    function activate() {
      ctrl.recommended2 = recommended.data.splice(4, 4);
      recommended.data.pop();
      recommended.data.pop();
      ctrl.recommended1 = recommended.data;
      console.log("RECOMMENDED", ctrl.recommended1, ctrl.recommended2);
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

    function getCode(variants) {
      return Object.keys(variants)[0];
    }
  }
})();
