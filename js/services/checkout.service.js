(function(){
  'use strict';

  angular.module('aha')
    .service('Checkout', CheckoutService);

  CheckoutService.$inject = ['$http', 'Cart', 'Auth', 'APP_CONFIG'];
  function CheckoutService($http, Cart, Auth, C) {
    var self = this;
    self.checkout = null;

    var setHeaders = function () {
      self.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
    };
    
    self.getCheckout = function() {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/checkout/'+Cart.getCartToken(), {headers: self.headers});
    };

    self.getCheckoutFromService = function (isNew, callback) {
      if (!isNew && self.checkout) {
        callback(null, self.checkout);
      } else {
        self.getCheckout()
          .then(function(res){
            self.checkout = res.data;
            callback(null, res.data);
          })
          .catch(function(err){
            callback(err.data, null);
          });
      }
    };

    self.getPayments = function () {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/checkout/'+Cart.getCartToken()+'/payment', {headers: self.headers});
    };

    self.getShippings = function () {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/checkout/'+Cart.getCartToken()+'/shipping', {headers: self.headers});
    };

    self.updateShipping = function (shippingMethod) {
      setHeaders();
      var body = {
        method: shippingMethod
      };
      return $http.put(C.apiUrl+'/shop-api/checkout/'+Cart.getCartToken()+'/shipping/'+shippingMethod, body, {headers: self.headers});
    };

    self.updatePayment = function (payMethod) {
      setHeaders();
      var body = {
        method: payMethod
      };
      return $http.put(C.apiUrl+'/shop-api/checkout/'+Cart.getCartToken()+'/payment/0', body, {headers: self.headers});
    };
    
    self.updateCheckoutState = function (address) {
      setHeaders();
      return $http.put(C.apiUrl+'/shop-api/checkout/'+Cart.getCartToken()+'/address', address, {headers: self.headers});
    };
  }
})();
