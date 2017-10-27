(function(){
  'use strict';

  angular.module('aha')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['account', 'wishlists', 'brands', 'favorites', 'Profile'];
  function ProfileController(account, wishlists, brands, favorites, Profile) {
    var ctrl = this;
    ctrl.account = account.data;
    ctrl.wishlist = wishlists.data[0];
    ctrl.favorites = favorites.data;
    ctrl.brands = brands.data;
    ctrl.selectedBrand = null;
    ctrl.selectBrand = selectBrand;
    ctrl.addToFavorites = addToFavorites;
    ctrl.removeFavorite = removeFavorite;
    ctrl.getCode = getCode;
    ctrl.deleteFromWishlist = deleteFromWishlist;

    activate();
    return;
    //////////////////////////////////////////
    
    function activate() {
      console.log("BRANDS", ctrl.brands);
      console.log("FAVORITES", ctrl.favorites);
    }

    function selectBrand(brand, index) {
      ctrl.selectedBrand = brand;
      ctrl.selected = index;
    }

    function addToFavorites() {
      if (!ctrl.selectedBrand) {
        return;
      }
      Profile.addFavoriteBrand(ctrl.selectedBrand.code)
        .then(function(res) {
          console.log("FAVORITE ADDED", res.data);
          ctrl.favorites.push(ctrl.selectedBrand);
        })
        .catch(function(err) {
          console.log("FAVORITE ADD ERR", err.data);
        });
    }

    function deleteFromWishlist(code, index) {
      Profile.removeFromWishlist(ctrl.wishlist.id, code)
        .then(function (res) {
          console.log("ITEM DELETED");
          ctrl.wishlist.items.splice(index, 1);
        })
        .catch(function (err) {
          console.log("ERR DELETE ITEM", err.data);
        })
    }

    function removeFavorite(fav, index) {
      Profile.removeFavoriteBrand(fav.code)
        .then(function(res) {
          console.log("BRAND DELETED", res.data);
          ctrl.favorites.splice(index, 1);
        })
        .catch(function(err) {
          console.log("BRAND DELETE ERR", err.data);
        });
    }

    function getCode(variants) {
      return Object.keys(variants)[0];
    }
  }
})();
