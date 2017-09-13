(function(){
  'use strict';

  angular.module('aha')
    .service('Cart', CartService);

  CartService.$inject = ['$http', '$q', '$state', 'Auth', 'Product', '$rootScope', 'APP_CONFIG'];
  function CartService($http, $q, $state, Auth, Product, $rootScope, C) {
    var self = this;
    self.cart = {};
    
    var setHeaders = function () {
      self.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
    };
    
    self.createCart = function(token) {
      var body = {
        channel: $rootScope.channel
      };
      setHeaders();
      return $http.post(C.apiUrl+'/shop-api/carts/'+token, body, {headers: self.headers});
    };

    self.getCartItems = function(token) {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/carts/'+token, {headers: self.headers});
    };

    self.addCartItem = function(item) {
      setHeaders();
      return $http.post(C.apiUrl+'/shop-api/carts/'+self.getCartToken()+'/items', item, {headers: self.headers});
    };

    self.updateCartItem = function(quantity, itemId) {
      setHeaders();
      return $http.put(C.apiUrl+'/shop-api/carts/'+self.getCartToken()+'/'+itemId, quantity, {headers: self.headers});
    };

    self.updateCartItems = function(items) {
      var promises = [];
      angular.forEach(items, function(item){
        promises.push(self.updateCartItem(item.quantity, item.id));
      });
      return $q.all(promises);
    };

    self.deleteCartItem = function(itemId) {
      setHeaders();
      return $http.delete(C.apiUrl+'/shop-api/carts/'+self.getCartToken()+'/'+itemId, {headers: self.headers});
    };

    self.storeCartToken = function(token) {
      localStorage.setItem('cart_token', token);
    };

    self.getCartToken = function() {
      return localStorage.getItem('cart_token');
    };

    return self;
  }
})();
