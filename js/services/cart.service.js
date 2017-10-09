(function(){
  'use strict';

  angular.module('aha')
    .service('Cart', CartService);

  CartService.$inject = ['$http', '$q', '$state', 'Auth', 'Product', '$rootScope', 'APP_CONFIG'];
  function CartService($http, $q, $state, Auth, Product, $rootScope, C) {
    var self = this;
    self.cart = null;
    var lang = JSON.parse(localStorage.lang);
    
    var setHeaders = function () {
      self.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
    };
    
    self.createCart = function(token) {
      var body = {
        channel: lang.ch
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
      var body = {
        quantity: quantity
      }
      return $http.put(C.apiUrl+'/shop-api/carts/'+self.getCartToken()+'/items/'+itemId, body, {headers: self.headers});
    };

    self.updateCartItems = function(items) {
      var promises = [];
      angular.forEach(items, function(item) {
        promises.push(self.updateCartItem(item.quantity, item.id));
      });
      return $q.all(promises);
    };

    self.deleteCartItem = function(itemId) {
      setHeaders();
      return $http.delete(C.apiUrl+'/shop-api/carts/'+self.getCartToken()+'/items/'+itemId, {headers: self.headers});
    };

    self.storeCartToken = function(token) {
      localStorage.setItem('cart_token', token);
    };

    self.getCartToken = function() {
      return localStorage.getItem('cart_token');
    };

    self.getCart = function(token, callback) {
      if (self.cart) {
        callback(null, self.cart);
      } else {
        self.getCartItems(token)
          .then(function(res) {
            self.cart = res.data;
            self.storeCartToken(token);
            callback(null, self.cart);
          })
          .catch(function(err) {
            self.createCart(token)
              .then(function (res) {
                self.cart = res.data;
                self.storeCartToken(token);
                callback(null, self.cart);
              })
              .catch(function (err) {
                console.log(err);
                callback(err, null);
              });
          });
      }
    };

    return self;
  }
})();
