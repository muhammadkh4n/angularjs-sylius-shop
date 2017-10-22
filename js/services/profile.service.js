(function(){
  'use strict';

  angular.module('aha')
    .service('Profile', ProfileService);

  ProfileService.$inject = ['$http', 'Auth', 'APP_CONFIG'];
  function ProfileService($http, Auth, CONFIG) {
    var service = this;
    this.headers = {};
    var lang = JSON.parse(localStorage.lang);

    var setHeaders = function () {
      service.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
    };

    service.getAccount = function() {
      setHeaders();
      return $http.get(CONFIG.apiUrl+'/shop-api/account', {headers: this.headers});
    };

    service.getWishlists = function() {
      setHeaders();
      return $http.get(CONFIG.apiUrl+'/shop-api/account/wishlist?channel='+lang.ch,
                       {headers: this.headers});
    };

    service.addToWishlist = function(productVariant) {
      var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
      return $http.put(CONFIG.apiUrl+
                        '/shop-api/account/wishlist?channel='+
                        lang.ch+'&locale='+lang.loc,
                        productVariant,
                        {headers: this.headers});
    };

    service.removeFromWishlist = function(listId, variantCode) {
      setHeaders();
      return $http.delete(CONFIG.apiUrl+'/shop-api/account/wishlist/'+
                          listId+'/'+variantCode, {headers: this.headers});
    };

    service.createWishlist = function() {
      setHeaders();
      var wishlist = {title: "My Wishlist"};
      return $http.post(CONFIG.apiUrl+'/shop-api/account/wishlist?channel='+lang.ch,
                        wishlist, {headers: this.headers})
        .then(function(res) {
          console.log("WISHLIST CREATED", res.data);
        })
        .catch(function(err) {
          console.log("WISHLIST ERR", err);
        });
    };

    service.getFavoriteBrands = function() {
      setHeaders();
      return $http.get(CONFIG.apiUrl+'/shop-api/account/favorite-taxon?locale='+
                       lang.loc, {headers: this.headers});
    };

    service.addFavoriteBrand = function(brandCode) {
      setHeaders();
      return $http.put(CONFIG.apiUrl+'/shop-api/account/favorite-taxon/'+
                       brandCode, null, {headers: this.headers});
    };

    service.removeFavoriteBrand = function(brandCode) {
      setHeaders();
      return $http.delete(CONFIG.apiUrl+'/shop-api/account/favorite-taxon/'+
                       brandCode, {headers: this.headers});
    };

    return service;
  }
})();
